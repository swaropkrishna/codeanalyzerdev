import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionButtonProps {
  tier: "pro" | "plus";
  priceId: string;
  features?: string[];
}

export function SubscriptionButton({ tier, priceId, features }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = async () => {
    console.log('Starting subscription process for tier:', tier);
    setIsLoading(true);
    try {
      // First check if user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('User not authenticated, redirecting to auth page');
        toast({
          title: "Authentication Required",
          description: "Please sign in or create an account to upgrade.",
        });
        navigate("/auth?view=sign_up");
        return;
      }

      // If user is authenticated, proceed with checkout
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
      console.error('Error in subscription process:', error);
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
    <div className="space-y-4">
      <Button
        className="w-full"
        onClick={handleSubscribe}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : `Upgrade to ${tier.charAt(0).toUpperCase() + tier.slice(1)}`}
      </Button>
      {features && features.length > 0 && (
        <ul className="space-y-2 text-sm text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
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
      )}
    </div>
  );
}