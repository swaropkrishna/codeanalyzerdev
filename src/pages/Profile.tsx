import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const { toast } = useToast();

  const { data: userData, isLoading } = useQuery({
    queryKey: ['user-profile'],
    queryFn: async () => {
      console.log('Fetching user profile data');
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user?.id) {
        console.log('No active session found');
        throw new Error('Not authenticated');
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        throw error;
      }

      console.log('User data:', user);
      return user;
    }
  });

  const handleCancelSubscription = async () => {
    try {
      const { error } = await supabase.functions.invoke('cancel-subscription');
      if (error) throw error;
      
      toast({
        title: "Subscription Cancelled",
        description: "Your subscription has been cancelled successfully.",
      });
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="mt-1">{userData?.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Subscription Tier</label>
              <p className="mt-1 capitalize">{userData?.subscription_tier}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Analysis Count</label>
              <p className="mt-1">{userData?.analysis_count} analyses performed</p>
            </div>
            {userData?.subscription_tier !== 'free' && (
              <Button 
                variant="destructive"
                onClick={handleCancelSubscription}
              >
                Cancel Subscription
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}