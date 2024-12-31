import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail } from "lucide-react";

export default function VerifyEmail() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in VerifyEmail:", event, session);
      if (session?.user?.email_confirmed_at) {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="container max-w-lg mx-auto px-4 py-12">
      <div className="space-y-6 text-center">
        <Mail className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Check your email</h1>
        
        <Alert>
          <AlertDescription className="text-center">
            We've sent you a verification link. Please check your email and click the link to verify your account.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Once verified, you'll be automatically redirected to the application.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full"
          >
            Continue without verifying
          </Button>
        </div>
      </div>
    </div>
  );
}