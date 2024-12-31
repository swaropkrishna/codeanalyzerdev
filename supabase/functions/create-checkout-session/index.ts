import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
  )

  try {
    console.log('Starting checkout session creation process...')
    
    // Get the session or user object
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      console.error('No authorization header found')
      throw new Error('Authorization required')
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError) {
      console.error('Error getting user:', userError)
      throw userError
    }

    const user = userData.user
    const email = user?.email

    if (!email) {
      console.error('No email found for user')
      throw new Error('No email found')
    }

    console.log('User authenticated:', email)

    // Check for Stripe secret key
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      console.error('Stripe secret key not found in environment variables')
      throw new Error('Stripe configuration error')
    }

    console.log('Initializing Stripe client...')
    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })

    // Get the price_id from the request body
    const { price_id } = await req.json()
    if (!price_id) {
      console.error('No price ID provided in request body')
      throw new Error('No price ID provided')
    }

    console.log('Looking up customer with email:', email)
    const customers = await stripe.customers.list({
      email: email,
      limit: 1
    })

    let customer_id = undefined
    if (customers.data.length > 0) {
      customer_id = customers.data[0].id
      console.log('Found existing customer:', customer_id)
      
      // check if already subscribed to this price
      const subscriptions = await stripe.subscriptions.list({
        customer: customers.data[0].id,
        status: 'active',
        price: price_id,
        limit: 1
      })

      if (subscriptions.data.length > 0) {
        console.error('Customer already has an active subscription for this price')
        throw new Error("Already subscribed to this plan")
      }
    } else {
      console.log('No existing customer found, will create new customer during checkout')
    }

    // Get the origin from the request headers and ensure it's properly formatted
    const origin = req.headers.get('origin')?.replace(/\/$/, '') || 'http://localhost:3000'

    console.log('Creating checkout session...')
    const session = await stripe.checkout.sessions.create({
      customer: customer_id,
      customer_email: customer_id ? undefined : email,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${origin}/subscription/success`,
      cancel_url: `${origin}/subscription/cancel`,
    })

    console.log('Checkout session created successfully:', session.id)
    return new Response(
      JSON.stringify({ url: session.url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error in checkout process:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.toString()
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})