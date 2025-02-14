import { useNavigate } from "react-router-dom";
import { UserPlus, LogIn, LogOut, CreditCard, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthState } from "@/hooks/use-auth-state";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, isSigningOut, handleSignOut } = useAuthState();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavItems = () => (
    <>
      <Button
        variant="ghost"
        className="flex w-full items-center justify-start gap-2 px-2 hover:bg-accent/50"
        onClick={() => {
          navigate("/pricing");
          setIsMobileMenuOpen(false);
        }}
      >
        <CreditCard className="h-5 w-5 text-primary" />
        <span className="font-medium">Pricing</span>
      </Button>

      {!isAuthenticated && (
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
      )}
      
      {isAuthenticated && (
        <>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-2 px-2 hover:bg-accent/50"
            onClick={() => {
              navigate("/profile");
              setIsMobileMenuOpen(false);
            }}
          >
            <User className="h-5 w-5 text-primary" />
            <span className="font-medium">Profile</span>
          </Button>
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
        </>
      )}
    </>
  );

  return (
    <header className="w-full">
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
        <div className="hidden md:flex items-center gap-4">
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hover:bg-accent/50"
              onClick={() => navigate("/pricing")}
            >
              Pricing
            </Button>
          </nav>

          {!isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                className="hover:bg-accent/50"
                onClick={() => navigate("/auth?view=sign_up")}
              >
                Sign Up
              </Button>
              <Button
                variant="ghost"
                className="hover:bg-accent/50"
                onClick={() => navigate("/auth?view=sign_in")}
              >
                Sign In
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-destructive focus:text-destructive" 
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                >
                  {isSigningOut ? "Signing out..." : "Sign Out"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

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
            className="w-[280px] p-0"
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