import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

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
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  height: '2.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  opacity: '1',
                },
                anchor: {
                  color: 'hsl(var(--primary))',
                  fontWeight: '500',
                  opacity: '1',
                },
                container: {
                  width: '100%',
                },
                input: {
                  borderRadius: '0.75rem',
                  border: '1px solid hsl(var(--border))',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  backgroundColor: 'hsl(var(--background))',
                  color: 'hsl(var(--foreground))',
                  transition: 'all 0.2s',
                  outline: 'none',
                },
                label: {
                  color: 'hsl(var(--foreground))',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                },
                message: {
                  color: 'hsl(var(--muted-foreground))',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                },
              },
              className: {
                button: 'w-full hover:opacity-90 transition-opacity',
                anchor: 'hover:opacity-80',
                input: 'focus:border-primary focus:ring-2 focus:ring-primary/20',
                container: 'w-full space-y-6',
                label: 'text-sm font-medium',
                message: 'text-sm text-muted-foreground',
              }
            }}
            providers={["github"]}
            redirectTo={window.location.origin}
            view={view === "sign_up" ? "sign_up" : "sign_in"}
            localization={{
              variables: {
                sign_up: {
                  first_name_label: "First Name",
                  first_name_input_placeholder: "John",
                  last_name_label: "Last Name",
                  last_name_input_placeholder: "Doe",
                  password_label: "Create Password",
                  password_input_placeholder: "••••••••",
                  confirm_password_label: "Confirm Password",
                  confirm_password_input_placeholder: "••••••••",
                  email_label: "Email address",
                  email_input_placeholder: "name@example.com",
                  button_label: "Create Account",
                },
                sign_in: {
                  password_label: "Password",
                  password_input_placeholder: "••••••••",
                  email_label: "Email address",
                  email_input_placeholder: "name@example.com",
                  button_label: "Sign In",
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}