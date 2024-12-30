import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
        </div>
      </div>
    </div>
  );
}