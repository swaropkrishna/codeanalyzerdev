import { useQuery } from "@tanstack/react-query";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { supabase } from "@/integrations/supabase/client";

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
      const { data, error } = await supabase
        .from('stripe_prices')
        .select('*')
        .eq('mode', 'test')
        .eq('active', true);
      
      if (error) throw error;
      return data;
    }
  });

  const getPrice = (tier: string) => {
    return prices?.find(price => price.tier === tier);
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
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your code analysis needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 animate-fade-in-up">
            {/* Free Tier */}
            <div className="rounded-lg border p-8 bg-card relative flex flex-col">
              <div className="flex-grow space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Free</h2>
                  <p className="text-sm text-muted-foreground">
                    Perfect for occasional use
                  </p>
                  <div className="flex items-baseline text-3xl font-bold">
                    $0
                    <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    1 analysis per day
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Basic code insights
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <svg
                      className="mr-2 h-4 w-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Community support
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t">
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-muted-foreground bg-secondary rounded-md hover:bg-secondary/80"
                  disabled
                >
                  Current Plan
                </button>
              </div>
            </div>

            {/* Pro Tier */}
            <div className="rounded-lg border p-8 bg-card relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                Popular
              </div>
              <div className="flex-grow space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Pro</h2>
                  <p className="text-sm text-muted-foreground">
                    For power users
                  </p>
                  <div className="flex items-baseline text-3xl font-bold">
                    ${proPrice?.amount}
                    <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t">
                <SubscriptionButton
                  tier="pro"
                  priceId={proPrice?.price_id ?? ''}
                  price={proPrice?.amount.toString() ?? '9.99'}
                  features={proFeatures}
                />
              </div>
            </div>

            {/* Plus Tier */}
            <div className="rounded-lg border p-8 bg-card relative flex flex-col">
              <div className="flex-grow space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Plus</h2>
                  <p className="text-sm text-muted-foreground">
                    For teams and heavy users
                  </p>
                  <div className="flex items-baseline text-3xl font-bold">
                    ${plusPrice?.amount}
                    <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
                  </div>
                </div>
                <ul className="space-y-3">
                  {plusFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 pt-6 border-t">
                <SubscriptionButton
                  tier="plus"
                  priceId={plusPrice?.price_id ?? ''}
                  price={plusPrice?.amount.toString() ?? '29.99'}
                  features={plusFeatures}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}