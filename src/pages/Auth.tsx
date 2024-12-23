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
        console.log("Auth state changed:", event, session);
        if (session) {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-lg shadow-sm animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
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
                  brand: '#9b87f5',
                  brandAccent: '#7E69AB',
                  brandButtonText: 'white',
                  defaultButtonBackground: '#F5F5F5',
                  defaultButtonBackgroundHover: '#E5DEFF',
                  inputBackground: 'white',
                  inputBorder: '#E2E8F0',
                  inputBorderHover: '#CBD5E1',
                  inputBorderFocus: '#9b87f5',
                  dividerBackground: '#E2E8F0',
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors',
              input: 'w-full rounded-md border border-input bg-background px-3 py-2',
              label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              loader: 'animate-spin',
              anchor: 'text-sm font-medium text-primary hover:text-primary/80',
              divider: 'bg-muted/60',
              message: 'text-sm text-foreground/80',
            }
          }}
          providers={["google", "github"]}
          view="sign_in"
          showLinks={true}
          redirectTo={`${window.location.origin}/auth`}
          magicLink={true}
          queryParams={{
            access_type: 'offline',
            prompt: 'consent',
          }}
        />
      </div>
    </div>
  );
};

export default AuthPage;