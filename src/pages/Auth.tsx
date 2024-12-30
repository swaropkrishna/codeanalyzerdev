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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1F2C]">
            {view === "sign_up" ? "Create an account" : "Welcome back"}
          </h1>
          <p className="text-[#8E9196] text-lg">
            {view === "sign_up" 
              ? "Enter your details to create your account" 
              : "Enter your credentials to access your account"}
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#D6BCFA]/20 p-8 shadow-xl shadow-[#9b87f5]/5">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              style: {
                button: {
                  background: '#9b87f5',
                  color: 'white',
                  borderRadius: '0.75rem',
                  padding: '0.75rem 1rem',
                  height: '2.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  transition: 'all 0.2s',
                  ["&:hover"]: {
                    background: '#7E69AB',
                  },
                },
                anchor: {
                  color: '#6E59A5',
                  fontWeight: '500',
                  ["&:hover"]: {
                    color: '#9b87f5',
                  },
                },
                container: {
                  width: '100%',
                },
                input: {
                  borderRadius: '0.75rem',
                  border: '1px solid #D6BCFA',
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  transition: 'all 0.2s',
                  ["&:focus"]: {
                    borderColor: '#9b87f5',
                    boxShadow: '0 0 0 2px rgba(155, 135, 245, 0.2)',
                  },
                },
                label: {
                  color: '#1A1F2C',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                },
                message: {
                  color: '#6E59A5',
                  fontSize: '0.875rem',
                  marginTop: '0.5rem',
                },
              },
              className: {
                container: 'w-full space-y-6',
                button: 'w-full hover:opacity-90 transition-opacity',
                input: 'w-full',
                label: 'text-sm font-medium',
                message: 'text-sm text-[#6E59A5]',
              }
            }}
            providers={["github"]}
            redirectTo={window.location.origin}
            view={view === "sign_up" ? "sign_up" : "sign_in"}
            localization={{
              variables: {
                sign_up: {
                  password_label: "Create Password",
                  password_input_placeholder: "••••••••",
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