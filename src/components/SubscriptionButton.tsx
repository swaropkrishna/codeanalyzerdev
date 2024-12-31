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

export function SubscriptionButton({ tier, priceId }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      console.log('Creating checkout session for tier:', tier, 'with price ID:', priceId);
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { price_id: priceId }
      });

      if (error) {
        console.error('Error creating checkout session:', error);
        throw error;
      }
      
      if (!data?.url) {
        console.error('No checkout URL received');
        throw new Error('No checkout URL received');
      }

      console.log('Redirecting to checkout URL:', data.url);
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
    <Button
      className="w-full"
      onClick={handleSubscribe}
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : `Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`}
    </Button>
  );
}