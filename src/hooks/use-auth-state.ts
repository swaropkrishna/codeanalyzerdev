import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useAuthState() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, !!session);
      setIsAuthenticated(!!session);
    });

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", !!session);
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (isSigningOut) {
      console.log("Sign out already in progress");
      return;
    }

    setIsSigningOut(true);

    try {
      // First, check if we have a valid session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      // If there's a session error or no session, we consider the user already signed out
      if (sessionError) {
        console.log("Session error, clearing local state:", sessionError);
        setIsAuthenticated(false);
        navigate("/auth");
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
        });
        return;
      }

      if (!session) {
        console.log("No active session found, clearing local state");
        setIsAuthenticated(false);
        navigate("/auth");
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
        });
        return;
      }

      console.log("Active session found, proceeding with sign out");
      
      // Attempt to sign out
      const { error: signOutError } = await supabase.auth.signOut({
        scope: 'local'
      });
      
      if (signOutError) {
        console.log("Sign out error:", signOutError);
        
        // Check if it's a session not found error
        const errorBody = signOutError.message.includes("session_not_found") || 
                         (typeof signOutError === 'object' && 
                          signOutError.message && 
                          signOutError.message.includes("403"));
        
        if (errorBody) {
          console.log("Session not found or expired, clearing local state");
          setIsAuthenticated(false);
          navigate("/auth");
          toast({
            title: "Session Expired",
            description: "Your session has expired. Please sign in again.",
          });
          return;
        }

        // For any other error, we'll clear the local state anyway
        console.log("Other sign out error, clearing local state");
        setIsAuthenticated(false);
        navigate("/auth");
        toast({
          title: "Signed Out",
          description: "You have been signed out due to a session error.",
        });
        return;
      }

      console.log("Sign out successful");
      setIsAuthenticated(false);
      navigate("/auth");
      toast({
        title: "Signed Out Successfully",
        description: "You have been signed out of your account.",
      });
    } catch (error) {
      console.error("Error during sign out:", error);
      // For any error, we'll clear the local state
      setIsAuthenticated(false);
      navigate("/auth");
      toast({
        title: "Session Expired",
        description: "Your session has expired. Please sign in again.",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return {
    isAuthenticated,
    isSigningOut,
    handleSignOut
  };
}