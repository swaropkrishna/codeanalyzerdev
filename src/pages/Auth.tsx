import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/dashboard/Navigation";

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const view = searchParams.get('view') || 'sign_in';

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        
        if (event === 'SIGNED_IN' && session) {
          try {
            // Check if user exists in users table
            const { data: existingUser, error: fetchError } = await supabase
              .from('users')
              .select('*')
              .eq('id', session.user.id)
              .maybeSingle();

            if (fetchError) {
              console.error("Error fetching user:", fetchError);
              return;
            }

            // If user doesn't exist in users table, create them
            if (!existingUser) {
              console.log("Creating new user in users table");
              const { error: insertError } = await supabase
                .from('users')
                .insert([
                  {
                    id: session.user.id,
                    email: session.user.email,
                    is_pro: false
                  }
                ]);

              if (insertError) {
                console.error("Error creating user:", insertError);
                return;
              }
            }

            navigate("/dashboard");
          } catch (error) {
            console.error("Error in auth flow:", error);
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation showAuthButtons={true} />
      <div className="flex-grow flex items-center justify-center px-4 py-section sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-section bg-card p-element rounded-lg shadow-sm animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {view === 'sign_up' ? 'Create your account' : 'Welcome back'}
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              {view === 'sign_up' 
                ? 'Sign up to start summarizing your meeting notes'
                : 'Sign in to continue with your summaries'}
            </p>
          </div>
          
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#4A90E2',
                    brandAccent: '#357ABD',
                    brandButtonText: 'white',
                    defaultButtonBackground: 'white',
                    defaultButtonBackgroundHover: '#F8FAFC',
                    defaultButtonBorder: '#E2E8F0',
                    defaultButtonText: '#1E293B',
                    inputBackground: 'white',
                    inputBorder: '#E2E8F0',
                    inputBorderHover: '#CBD5E1',
                    inputBorderFocus: '#4A90E2',
                    dividerBackground: '#E2E8F0',
                  }
                }
              },
              className: {
                container: 'w-full space-y-element',
                button: 'w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-colors p-element',
                divider: 'bg-gray-200 my-element',
                label: 'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-left mb-2',
                input: 'w-full rounded-md border border-input bg-background px-element py-3',
                loader: 'animate-spin',
                anchor: 'text-sm font-medium text-primary hover:text-primary/80',
                message: 'text-sm text-foreground/80 mt-2',
              }
            }}
            providers={["google", "github"]}
            view={view === 'sign_up' ? 'sign_up' : 'sign_in'}
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
      <Footer />
    </div>
  );
};

export default AuthPage;