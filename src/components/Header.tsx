import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      // First, get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error("Session error:", sessionError);
        throw new Error(`Failed to get session: ${sessionError.message}`);
      }

      if (!session) {
        console.log("No active session found");
        // Clear local state and redirect
        setIsAuthenticated(false);
        navigate("/auth");
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please sign in again.",
          variant: "destructive",
        });
        return;
      }

      console.log("Current session found, proceeding with sign out");
      
      // Attempt to sign out
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        console.error("Sign out error:", signOutError);
        throw new Error(`Failed to sign out: ${signOutError.message}`);
      }

      // Only clear authentication state after successful sign out
      console.log("Sign out successful");
      setIsAuthenticated(false);
      navigate("/auth");
      
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account",
      });
    } catch (error) {
      console.error("Error during sign out:", error);
      // Ensure authentication state reflects actual session state
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      toast({
        title: "Error signing out",
        description: error instanceof Error ? error.message : "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const NavItems = () => (
    <>
      {!isAuthenticated ? (
        <>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2 px-2 hover:bg-accent/50"
            onClick={() => {
              navigate("/auth?view=sign_up");
              setIsMobileMenuOpen(false);
            }}
          >
            <UserPlus className="h-5 w-5 text-primary" />
            <span className="font-medium">Sign Up</span>
          </Button>
          
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2 px-2 hover:bg-accent/50"
            onClick={() => {
              navigate("/auth?view=sign_in");
              setIsMobileMenuOpen(false);
            }}
          >
            <LogIn className="h-5 w-5 text-primary" />
            <span className="font-medium">Sign In</span>
          </Button>
        </>
      ) : (
        <Button
          variant="ghost"
          className="flex w-full items-center justify-start gap-2 px-2 hover:bg-destructive/10"
          onClick={() => {
            handleSignOut();
            setIsMobileMenuOpen(false);
          }}
          disabled={isSigningOut}
        >
          <LogOut className="h-5 w-5 text-destructive" />
          <span className="font-medium">
            {isSigningOut ? "Signing out..." : "Sign Out"}
          </span>
        </Button>
      )}
    </>
  );

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
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavItems />
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-accent/10"
            >
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-[280px] p-0 bg-white/95 backdrop-blur-lg"
          >
            <SheetHeader className="p-6 border-b">
              <SheetTitle className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Menu
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 p-4">
              <NavItems />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}