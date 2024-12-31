import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useUserStatus() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
        
        if (session?.user) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('is_pro')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (error) {
            console.error('Error fetching user data:', error);
            return;
          }
          
          setIsPro(userData?.is_pro || false);
        }
      } catch (error) {
        console.error('Error checking user status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      
      if (session?.user) {
        const { data: userData, error } = await supabase
          .from('users')
          .select('is_pro')
          .eq('id', session.user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching user data:', error);
          return;
        }
        
        setIsPro(userData?.is_pro || false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { isAuthenticated, isPro, isLoading };
}