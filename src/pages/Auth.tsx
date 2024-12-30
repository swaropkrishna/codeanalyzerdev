import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CustomAuthForm } from "@/components/CustomAuthForm";

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-primary/10 to-accent/10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {view === "sign_up" ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-muted-foreground text-lg">
            {view === "sign_up" 
              ? "Enter your details to create your account" 
              : "Enter your credentials to access your account"}
          </p>
        </div>
        
        <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/20 p-8 shadow-xl shadow-primary/5">
          <CustomAuthForm view={view === "sign_up" ? "sign_up" : "sign_in"} />
          
          <div className="mt-6 text-center space-y-4">
            {view === "sign_up" ? (
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/auth?view=sign_in"
                  className="font-medium text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    to="/auth?view=sign_up"
                    className="font-medium text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
                <Link
                  to="/auth/reset-password"
                  className="text-sm font-medium text-primary hover:underline block"
                >
                  Forgot your password?
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}