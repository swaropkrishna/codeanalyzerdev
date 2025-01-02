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

  const { data: prices, isLoading } = useQuery({
    queryKey: ['stripe-prices'],
    queryFn: async () => {
      console.log('Fetching stripe prices');
      const { data, error } = await supabase
        .from('stripe_prices')
        .select('*')
        .eq('mode', 'real')  // Changed from 'live' to 'real'
        .eq('active', true);
      
      if (error) {
        console.error('Error fetching prices:', error);
        throw error;
      }
      console.log('Fetched prices:', data);
      return data;
    }
  });

  const getPrice = (tier: string) => {
    const price = prices?.find(price => price.tier === tier);
    console.log(`Getting price for tier ${tier}:`, price);
    return price;
  };

  if (isLoading) {
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
              isFreeTier
            />

            <PricingTier
              title="Pro"
              description="For power users"
              price={proPrice?.amount ?? 0}
              features={proFeatures}
              priceId={proPrice?.price_id}
              tier="pro"
              isPopular
            />

            <PricingTier
              title="Plus"
              description="For teams and heavy users"
              price={plusPrice?.amount ?? 0}
              features={plusFeatures}
              priceId={plusPrice?.price_id}
              tier="plus"
            />
          </div>
        </div>
      </section>
    </main>
  );
}