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
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm animate-fade-in">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
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
                  brand: '#D3E4FD', // Soft blue for primary elements
                  brandAccent: '#F97316', // Bright green for CTAs
                  brandButtonText: 'white',
                }
              }
            },
            className: {
              container: 'w-full',
              button: 'w-full bg-[#F97316] text-white hover:bg-[#F97316]/90 transition-colors',
              input: 'w-full rounded-md border border-input bg-background px-3 py-2',
              label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
              loader: 'animate-spin',
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