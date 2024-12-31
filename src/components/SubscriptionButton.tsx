import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionButtonProps {
  tier: "pro" | "plus";
  priceId: string;
  price: string;
  features: string[];
}

export function SubscriptionButton({ tier, priceId, price, features }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { price_id: priceId }
      });

      if (error) throw error;
      if (!data.url) throw new Error('No checkout URL received');

      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold">{tier.charAt(0).toUpperCase() + tier.slice(1)} Plan</h3>
        <p className="text-sm text-muted-foreground">
          {tier === "pro" ? "For power users" : "For teams and heavy users"}
        </p>
        <div className="flex items-baseline text-3xl font-bold">
          ${price}
          <span className="ml-1 text-lg font-normal text-muted-foreground">/month</span>
        </div>
      </div>
      
      <ul className="space-y-3">
        {features.map((feature, index) => (
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

      <Button
        className="w-full"
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : `Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`}
      </Button>
    </div>
  );
}