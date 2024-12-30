import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              {view === "sign_up" ? "Create an account" : "Welcome back"}
            </h1>
            <p className="text-muted-foreground">
              {view === "sign_up" 
                ? "Enter your details to create your account" 
                : "Enter your credentials to access your account"}
            </p>
          </div>
          
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    background: '#4A90E2',
                    color: 'white',
                    borderRadius: '6px',
                  },
                  anchor: {
                    color: '#4A90E2',
                  },
                  container: {
                    width: '100%',
                  },
                  input: {
                    borderRadius: '6px',
                  },
                },
                className: {
                  container: 'w-full',
                  button: 'w-full py-2 hover:opacity-90 transition-opacity',
                  input: 'w-full rounded border-input bg-background px-3 py-2',
                  label: 'text-sm font-medium text-foreground',
                }
              }}
              providers={["github"]}
              redirectTo={window.location.origin}
              view={view === "sign_up" ? "sign_up" : "sign_in"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}