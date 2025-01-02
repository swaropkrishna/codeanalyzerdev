import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PricingHeader } from "@/components/pricing/PricingHeader";
import { PricingTier } from "@/components/pricing/PricingTier";

export default function Pricing() {
  const proFeatures = [
    "100 analyses per day",
    "Priority support",
    "Detailed code insights"
  ];

  const plusFeatures = [
    "Unlimited analyses",
    "Premium support",
    "Advanced code insights",
    "Team collaboration"
  ];

  // Fetch user's subscription tier
  const { data: userData } = useQuery({
    queryKey: ['user-subscription'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.id) return null;

      console.log('Fetching user subscription data');
      const { data, error } = await supabase
        .from('users')
        .select('subscription_tier')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching user subscription:', error);
        throw error;
      }
      console.log('User subscription data:', data);
      return data;
    }
  });

  const { data: prices, isLoading } = useQuery({
    queryKey: ['stripe-prices'],
    queryFn: async () => {
      console.log('Fetching stripe prices');
      const { data, error } = await supabase
        .from('stripe_prices')
        .select('*')
        .ilike('mode', 'real')
        .eq('active', true);
      
      if (error) {
        console.error('Error fetching prices:', error);
        throw error;
      }
      console.log('Fetched prices data:', data);
      return data;
    }
  });

  const getPrice = (tier: string) => {
    console.log('All available prices:', prices);
    const price = prices?.find(price => price.tier.toLowerCase() === tier.toLowerCase());
    console.log(`Getting price for tier ${tier}:`, price);
    return price;
  };

  if (isLoading) {
    console.log('Loading prices...');
    return (
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 text-center">
          Loading pricing information...
        </div>
      </main>
    );
  }

  const proPrice = getPrice('pro');
  const plusPrice = getPrice('plus');
  
  console.log('Pro price:', proPrice);
  console.log('Plus price:', plusPrice);
  console.log('Current user subscription tier:', userData?.subscription_tier);

  const currentTier = userData?.subscription_tier?.toLowerCase() || 'free';

  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto space-y-12">
          <PricingHeader />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch animate-fade-in-up">
            <PricingTier
              title="Free"
              description="Perfect for occasional use"
              price={0}
              features={[
                "1 analysis per day",
                "Basic code insights",
                "Community support"
              ]}
              isFreeTier={currentTier === 'free'}
            />

            <PricingTier
              title="Pro"
              description="For power users"
              price={proPrice?.amount ?? 0}
              features={proFeatures}
              priceId={proPrice?.price_id}
              tier="pro"
              isPopular
              isFreeTier={currentTier === 'pro'}
            />

            <PricingTier
              title="Plus"
              description="For teams and heavy users"
              price={plusPrice?.amount ?? 0}
              features={plusFeatures}
              priceId={plusPrice?.price_id}
              tier="plus"
              isFreeTier={currentTier === 'plus'}
            />
          </div>
        </div>
      </section>
    </main>
  );
}