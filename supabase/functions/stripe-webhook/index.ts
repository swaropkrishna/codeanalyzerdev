import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const stripe = new Stripe(Deno.env.get('STRIPE_API_KEY') || '', {
  apiVersion: '2023-10-16',
});

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    console.error('No Stripe signature found');
    return new Response('No signature', { status: 400 });
  }

  try {
    const body = await req.text();
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      throw new Error('Webhook secret not configured');
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );

    console.log('Processing Stripe event:', event.type);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      console.log('Checkout session completed:', session.id);

      // Get the price ID from the session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const priceId = lineItems.data[0]?.price?.id;

      if (!priceId) {
        throw new Error('No price ID found in session');
      }

      // Get the tier from our prices table
      const { data: priceData, error: priceError } = await supabase
        .from('stripe_prices')
        .select('tier')
        .eq('price_id', priceId)
        .single();

      if (priceError || !priceData) {
        console.error('Error fetching price data:', priceError);
        throw new Error('Could not find tier for price');
      }

      // Get customer email from session
      const customerEmail = session.customer_details?.email;
      if (!customerEmail) {
        throw new Error('No customer email found in session');
      }

      // Update user's subscription tier
      const { error: updateError } = await supabase
        .from('users')
        .update({ subscription_tier: priceData.tier })
        .eq('email', customerEmail);

      if (updateError) {
        console.error('Error updating user tier:', updateError);
        throw updateError;
      }

      console.log(`Updated subscription tier to ${priceData.tier} for user ${customerEmail}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (err) {
    console.error('Error processing webhook:', err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 400 }
    );
  }
});