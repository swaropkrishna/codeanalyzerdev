import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CreditCard, User, Mail, Activity, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

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
      return { ...user, email: session.user.email };
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
      <div className="max-w-3xl mx-auto space-y-8">
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Profile Information</CardTitle>
                <CardDescription>Manage your account details and subscription</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="mt-1">{userData?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Subscription Tier</p>
                  <p className="mt-1 capitalize">{userData?.subscription_tier}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Analysis Usage</p>
                  <p className="mt-1">{userData?.analysis_count} analyses performed</p>
                  <p className="text-sm text-muted-foreground">Daily limit: {userData?.max_analysis_count} analyses</p>
                </div>
              </div>

              {userData?.last_analysis_date && (
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Analysis</p>
                    <p className="mt-1">
                      {format(new Date(userData.last_analysis_date), 'PPP')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Subscription Management</h3>
              {userData?.subscription_tier !== 'free' && (
                <div>
                  <Button 
                    variant="destructive"
                    onClick={handleCancelSubscription}
                    className="w-full sm:w-auto"
                  >
                    Cancel Subscription
                  </Button>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your subscription will remain active until the end of the current billing period.
                  </p>
                </div>
              )}
              {userData?.subscription_tier === 'free' && (
                <p className="text-muted-foreground">
                  You are currently on the free tier. Visit our pricing page to upgrade your subscription.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}