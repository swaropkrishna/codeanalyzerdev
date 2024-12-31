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
      if (sessionError || !session) {
        console.log("No valid session found, considering user as signed out");
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
        // For any sign out error, we'll clear the local state anyway
        console.log("Sign out error, clearing local state:", signOutError);
        setIsAuthenticated(false);
        navigate("/auth");
        toast({
          title: "Signed out",
          description: "You have been signed out due to an expired session",
        });
        return;
      }

      console.log("Sign out successful");
      setIsAuthenticated(false);
      navigate("/auth");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
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