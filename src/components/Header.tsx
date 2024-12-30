import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, LogOut, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <header className="w-full border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-xl font-bold">Code Analyzer</h1>
        </div>
        
        <nav className="flex items-center space-x-4">
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
            variant="ghost"
            className="flex items-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => navigate("/pricing")}
          >
            <DollarSign className="h-4 w-4" />
            Pricing
          </Button>
        </nav>
      </div>
    </header>
  );
}