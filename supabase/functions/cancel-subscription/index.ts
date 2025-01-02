import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { stripe } from '../_shared/stripe.ts'
import { corsHeaders } from '../_shared/cors.ts'

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

    // Get user's subscription data
    const { data: userData, error: userDataError } = await supabaseClient
      .from('users')
      .select('subscription_tier')
      .eq('id', user.id)
      .single()

    if (userDataError || !userData) {
      throw new Error('User data not found')
    }

    if (userData.subscription_tier === 'free') {
      throw new Error('No active subscription to cancel')
    }

    // Get customer's subscriptions
    const { data: customer } = await stripe.customers.search({
      query: `email:'${user.email}'`,
    })

    if (!customer.data.length) {
      throw new Error('No Stripe customer found')
    }

    const subscriptions = await stripe.subscriptions.list({
      customer: customer.data[0].id,
      status: 'active',
    })

    if (!subscriptions.data.length) {
      throw new Error('No active subscription found')
    }

    // Cancel the subscription
    await stripe.subscriptions.update(subscriptions.data[0].id, {
      cancel_at_period_end: true,
    })

    // Update user's subscription status
    await supabaseClient
      .from('users')
      .update({ subscription_tier: 'free' })
      .eq('id', user.id)

    return new Response(
      JSON.stringify({ message: 'Subscription cancelled successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})