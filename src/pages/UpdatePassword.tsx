import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Lock } from "lucide-react";

export default function UpdatePassword() {
  const [searchParams] = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check for the presence of the reset token on component mount
  useEffect(() => {
    const checkResetToken = async () => {
      // Get the token from the URL
      const token = searchParams.get("token");
      
      if (!token) {
        console.log("No reset token found in URL");
        toast({
          variant: "destructive",
          title: "Invalid Reset Link",
          description: "Please request a new password reset link.",
        });
        navigate("/auth/reset-password");
        return;
      }

      try {
        // Verify the token is valid by attempting to get the session
        const { data, error } = await supabase.auth.getSession();
        
        if (error || !data.session) {
          console.log("Invalid or expired reset token:", error);
          toast({
            variant: "destructive",
            title: "Invalid or Expired Link",
            description: "Please request a new password reset link.",
          });
          navigate("/auth/reset-password");
        }
      } catch (error) {
        console.error("Error verifying reset token:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred. Please try again.",
        });
        navigate("/auth/reset-password");
      }
    };

    checkResetToken();
  }, [navigate, searchParams, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Attempting to update password");

    if (newPassword !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please ensure both passwords are identical",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        variant: "destructive",
        title: "Password too short",
        description: "Password must be at least 6 characters long",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error("Error updating password:", error);
        throw error;
      }

      console.log("Password updated successfully");
      toast({
        title: "Password Updated",
        description: "Your password has been successfully updated. Please sign in with your new password.",
      });
      
      // Sign out the user after password update
      await supabase.auth.signOut();
      
      // Redirect to sign in page after successful password update
      navigate("/auth?view=sign_in");
    } catch (error) {
      console.error("Update password error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="flex justify-center">
            <Lock className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Update Your Password
          </h1>
          <p className="text-muted-foreground text-lg">
            Enter your new password below
          </p>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/20 p-8 shadow-xl shadow-primary/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
                required
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your new password"
                required
                minLength={6}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}