import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { stripe, corsHeaders } from '../_shared/stripe.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    )

    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser()

    if (userError || !user) {
      throw new Error('Not authenticated')
    }

    console.log('Authenticated user:', user.email)

    // Get user's subscription data
    const { data: userData, error: userDataError } = await supabaseClient
      .from('users')
      .select('subscription_tier')
      .eq('id', user.id)
      .single()

    if (userDataError || !userData) {
      console.error('Error fetching user data:', userDataError)
      throw new Error('User data not found')
    }

    console.log('User subscription tier:', userData.subscription_tier)

    if (userData.subscription_tier === 'free') {
      throw new Error('No active subscription to cancel')
    }

    // Get customer's subscriptions
    const { data: customer } = await stripe.customers.search({
      query: `email:'${user.email}'`,
    })

    if (!customer.data.length) {
      console.error('No Stripe customer found for email:', user.email)
      throw new Error('No Stripe customer found')
    }

    console.log('Found Stripe customer:', customer.data[0].id)

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: 'active',
    })

    if (!subscriptions.data.length) {
      console.error('No active subscription found for customer:', customer.data[0].id)
      throw new Error('No active subscription found')
    }

    console.log('Found active subscription:', subscriptions.data[0].id)

    // Cancel the subscription
    await stripe.subscriptions.update(subscriptions.data[0].id, {
      cancel_at_period_end: true,
    })

    console.log('Subscription cancelled successfully')

    // Update user's subscription status
    const { error: updateError } = await supabaseClient
      .from('users')
      .update({ subscription_tier: 'free' })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating user subscription status:', updateError)
      throw new Error('Failed to update subscription status')
    }

    return new Response(
      JSON.stringify({ message: 'Subscription cancelled successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in cancel-subscription:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})