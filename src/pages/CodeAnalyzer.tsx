import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check initial auth state
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsAuthenticated(!!session);
  });

  // Subscribe to auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    setIsAuthenticated(!!session);
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Content will be added here in future updates */}
      </main>
      <Footer />
    </div>
  );
}