import { FileText, Mail, Shield, Users } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Code Analyzer</h3>
            <p className="text-sm text-muted-foreground">
              Analyze your code with AI-powered insights and suggestions.
            </p>
          </div>
          
          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <RouterLink to="/about" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  About Us
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/terms" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/privacy" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Privacy Policy
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/contact" className="hover:text-foreground transition-colors inline-flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Us
                </RouterLink>
              </li>
            </ul>
          </div>
          
          {/* Account Links */}
          <div className="space-y-4">
            <h4 className="font-medium">Account</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <RouterLink to="/auth?view=sign_in" className="hover:text-foreground transition-colors">
                  Sign In
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/auth?view=sign_up" className="hover:text-foreground transition-colors">
                  Sign Up
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Code Analyzer. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}