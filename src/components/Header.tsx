import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, LogOut, DollarSign, Menu } from "lucide-react";
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

          <Button
            variant="default"
            className="flex w-full items-center justify-start gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => {
              navigate("/pricing");
              setIsMobileMenuOpen(false);
            }}
          >
            <DollarSign className="h-5 w-5" />
            <span className="font-medium">Pricing</span>
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
        >
          <LogOut className="h-5 w-5 text-destructive" />
          <span className="font-medium">Sign Out</span>
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
              <Menu className="h-5 w-5" />
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