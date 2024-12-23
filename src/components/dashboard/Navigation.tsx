import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle, Menu } from "lucide-react";
import { useState } from "react";

export const Navigation = ({ showAuthButtons = false }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  return (
    <nav className="border-b border-secondary bg-card">
      <div className="max-w-7xl mx-auto px-element sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <span className="text-xl font-bold text-primary">Summarizer</span>
            </Link>
          </div>

          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="h-12 w-12"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-element">
            {!showAuthButtons && (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/history">
                  <Button variant="ghost" className="text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
                    History
                  </Button>
                </Link>
                <Link to="/account">
                  <Button variant="ghost" className="text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
                    Account
                  </Button>
                </Link>
              </>
            )}
            {showAuthButtons ? (
              <div className="flex space-x-element">
                <Button
                  onClick={() => navigate("/auth")}
                  variant="ghost"
                  className="text-secondary-foreground hover:text-foreground min-h-[44px] px-element"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate("/auth")}
                  className="bg-cta hover:bg-cta-hover text-white min-h-[44px] px-element"
                >
                  Sign Up
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-12 w-12">
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

        {isMenuOpen && !showAuthButtons && (
          <div className="sm:hidden py-element space-y-element">
            <Link to="/dashboard" className="block">
              <Button variant="ghost" className="w-full text-left text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
                Dashboard
              </Button>
            </Link>
            <Link to="/history" className="block">
              <Button variant="ghost" className="w-full text-left text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
                History
              </Button>
            </Link>
            <Link to="/account" className="block">
              <Button variant="ghost" className="w-full text-left text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
                Account
              </Button>
            </Link>
            <Button onClick={handleSignOut} variant="ghost" className="w-full text-left text-secondary-foreground hover:text-foreground min-h-[44px] px-element">
              Sign out
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};