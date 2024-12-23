import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";

export const Navigation = ({ showAuthButtons = false }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="border-b border-secondary bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-primary">Summarizer</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {!showAuthButtons && (
                <>
                  <Link to="/dashboard">
                    <Button variant="ghost" className="text-secondary-foreground hover:text-foreground">
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/history">
                    <Button variant="ghost" className="text-secondary-foreground hover:text-foreground">
                      History
                    </Button>
                  </Link>
                  <Link to="/account">
                    <Button variant="ghost" className="text-secondary-foreground hover:text-foreground">
                      Account
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            {showAuthButtons ? (
              <div className="flex space-x-4">
                <Button
                  onClick={() => navigate("/auth")}
                  variant="ghost"
                  className="text-secondary-foreground hover:text-foreground"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-cta hover:bg-cta-hover text-white"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-6 w-6 text-secondary-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card">
                  <DropdownMenuItem onClick={handleSignOut} className="text-secondary-foreground hover:text-foreground">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};