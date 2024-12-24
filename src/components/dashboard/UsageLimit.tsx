import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const UsageLimit = () => {
  const [isProMember, setIsProMember] = useState(false);

  useEffect(() => {
    const checkSubscriptionStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch pro status from users table
        const { data: userData, error } = await supabase
          .from('users')
          .select('is_pro')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user pro status:', error);
          return;
        }

        console.log('User subscription status:', userData?.is_pro ? 'Pro' : 'Free');
        setIsProMember(userData?.is_pro || false);
      } catch (error) {
        console.error('Error checking subscription status:', error);
      }
    };

    checkSubscriptionStatus();
  }, []);

  return (
    <div className="mt-8 p-4 bg-secondary rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-secondary-foreground">
          {isProMember 
            ? "Unlimited summaries available" 
            : "You have 2 summaries left today"}
        </span>
        {!isProMember && (
          <Button 
            className="bg-primary hover:bg-primary-hover text-primary-foreground"
          >
            Upgrade to Pro
          </Button>
        )}
      </div>
      {!isProMember && <Progress value={60} className="h-2 bg-muted" />}
    </div>
  );
};