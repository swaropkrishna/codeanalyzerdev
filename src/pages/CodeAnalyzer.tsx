import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { AnalysisForm } from "@/components/code-analyzer/AnalysisForm";

export default function CodeAnalyzer() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Check initial auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <main className="flex-1">
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Analyze Your Code with AI
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get instant insights and suggestions to improve your code quality using advanced AI analysis.
            </p>
          </div>
          
          {showUpgrade ? (
            <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
              <SubscriptionButton
                tier="pro"
                priceId="price_1Qc96EF80ze3XcIjv1wATjPg"
              />
              <SubscriptionButton
                tier="plus"
                priceId="price_1Qc96dF80ze3XcIjGggGJdaD"
              />
            </div>
          ) : (
            isAuthenticated && <AnalysisForm />
          )}
        </div>
      </section>
    </main>
  );
}