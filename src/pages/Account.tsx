import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/dashboard/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, CreditCard, LogOut } from "lucide-react";
import { useEffect, useState } from "react";

interface UserProfile {
  email: string | undefined;
}

export default function Account() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProfile() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }
        
        setProfile({
          email: user.email,
        });
      } catch (error) {
        console.error("Error loading user profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile information",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    getProfile();
  }, [navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast({
        title: "Success",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="animate-pulse text-center py-12 text-secondary-foreground">
            Loading...
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Profile Section */}
          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
              </div>
              <Button variant="outline" className="border-secondary hover:bg-secondary">Edit Profile</Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="mt-1 text-foreground">{profile?.email}</p>
              </div>
            </div>
          </Card>

          {/* Subscription Section */}
          <Card className="p-6 bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Subscription</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary p-4 rounded-lg">
                <h3 className="font-medium text-foreground">Current Plan</h3>
                <p className="text-secondary-foreground">Free Plan - 2 summaries/day</p>
              </div>
              <Button className="w-full sm:w-auto bg-cta hover:bg-cta-hover text-white">Upgrade to Pro</Button>
            </div>
          </Card>

          {/* Logout Button */}
          <div className="flex justify-end">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-secondary hover:bg-secondary"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}