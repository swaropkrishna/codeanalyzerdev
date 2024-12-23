import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          navigate("/");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to Summarizer
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to start summarizing your meeting notes
          </p>
        </div>
        
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#10B981',
                  brandAccent: '#059669',
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'w-full bg-primary text-white hover:bg-primary/90',
              input: 'w-full rounded-md border border-input px-3 py-2',
            }
          }}
          providers={["google"]}
          redirectTo={window.location.origin}
          onlyThirdPartyProviders={false}
        />
      </div>
    </div>
  );
};

export default AuthPage;