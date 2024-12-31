import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle2 } from "lucide-react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetSent, setIsResetSent] = useState(false);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we're in a cooldown period
    if (retryAfter !== null) {
      toast({
        variant: "destructive",
        title: "Please wait",
        description: `You can try again in ${retryAfter} seconds.`,
      });
      return;
    }

    // Prevent multiple submissions
    if (isLoading) {
      console.log("Request already in progress");
      return;
    }
    
    setIsLoading(true);
    console.log("Attempting to send reset password email to:", email);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (error) {
        console.error("Reset password error:", error);
        
        // Parse the error response
        const errorBody = error.message.includes("rate limit exceeded") || 
                         (typeof error === 'object' && 
                          error.message && 
                          error.message.includes("429"));
        
        if (errorBody) {
          // Extract wait time from error message or default to 60 seconds
          const waitTime = parseInt(error.message.match(/\d+/)?.[0] || "60");
          setRetryAfter(waitTime);
          
          // Start countdown
          const countdown = setInterval(() => {
            setRetryAfter((prev) => {
              if (prev === null || prev <= 1) {
                clearInterval(countdown);
                return null;
              }
              return prev - 1;
            });
          }, 1000);
          
          toast({
            variant: "destructive",
            title: "Too Many Attempts",
            description: `Please wait ${waitTime} seconds before trying again.`,
          });
          return;
        }
        
        throw error;
      }

      console.log("Reset password email sent successfully");
      setIsResetSent(true);
      toast({
        title: "Reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (error) {
      console.error("Reset password error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while sending the reset link",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isResetSent) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/20 p-8 shadow-xl shadow-primary/5">
            <div className="text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
              <h2 className="text-2xl font-semibold">Check Your Email</h2>
              <p className="text-muted-foreground">
                We've sent a password reset link to {email}
              </p>
              <Link
                to="/auth?view=sign_in"
                className="text-sm font-medium text-primary hover:underline block mt-4"
              >
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Reset Password
          </h1>
          <p className="text-muted-foreground text-lg">
            Enter your email to receive a password reset link
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/20 p-8 shadow-xl shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || retryAfter !== null}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || retryAfter !== null}
            >
              {isLoading ? "Sending..." : retryAfter !== null ? `Wait ${retryAfter}s` : "Send Reset Link"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/auth?view=sign_in"
              className="text-sm font-medium text-primary hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}