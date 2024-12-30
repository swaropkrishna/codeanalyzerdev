import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, LogOut, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/auth");
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 
            onClick={() => navigate("/")} 
            className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity"
          >
            Code Analyzer
          </h1>
        </div>
        
        <nav className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => navigate("/auth")}
              >
                <UserPlus className="h-4 w-4" />
                Sign Up
              </Button>
              
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => navigate("/auth")}
              >
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>

              <Button
                variant="default"
                className="flex items-center gap-2"
                onClick={() => navigate("/pricing")}
              >
                <DollarSign className="h-4 w-4" />
                Pricing
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}