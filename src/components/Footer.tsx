import { Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Code Analyzer</h3>
            <p className="text-sm text-muted-foreground">
              Analyze your code with AI-powered insights and suggestions.
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">
                  Try it now
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/auth?view=sign_in" className="hover:text-foreground transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/auth?view=sign_up" className="hover:text-foreground transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Social</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Code Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}