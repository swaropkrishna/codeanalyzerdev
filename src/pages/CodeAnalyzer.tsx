import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SubscriptionButton } from "@/components/SubscriptionButton";
import { CodeEditorSection } from "@/components/code-analyzer/CodeEditorSection";
import { AnalysisResults } from "@/components/code-analyzer/AnalysisResults";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");
  const [showUpgrade, setShowUpgrade] = useState(false);

  // Check initial auth state
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsAuthenticated(!!session);
  });

  // Subscribe to auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    setIsAuthenticated(!!session);
  });

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to analyze code",
        variant: "destructive",
      });
      navigate("/auth?view=sign_in");
      return;
    }

    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId) {
        throw new Error('User not found');
      }

      // First, try to update the analysis count
      const { data: userData, error: userError } = await supabase
        .from('users')
        .update({ analysis_count: undefined }) // Trigger the check_analysis_limits function
        .eq('id', userId)
        .select('subscription_tier')
        .maybeSingle();

      if (userError) {
        console.error('Error updating analysis count:', userError);
        
        // Check if it's a limit reached error
        if (userError.message.includes('Free tier limit reached')) {
          setShowUpgrade(true);
          toast({
            title: "Free Tier Limit Reached",
            description: "Please upgrade to Pro or Plus to continue analyzing code",
            variant: "destructive",
          });
          navigate("/pricing");
          return;
        } else if (userError.message.includes('Pro tier limit reached')) {
          setShowUpgrade(true);
          toast({
            title: "Pro Tier Limit Reached",
            description: "Please upgrade to Plus for unlimited analyses",
            variant: "destructive",
          });
          navigate("/pricing");
          return;
        }

        toast({
          title: "Error",
          description: "Failed to update analysis count. Please try again.",
          variant: "destructive",
        });
        return;
      }

      if (!userData) {
        console.error('User record not found');
        toast({
          title: "Error",
          description: "User record not found. Please try signing out and back in.",
          variant: "destructive",
        });
        return;
      }

      // If count update successful, proceed with analysis
      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code }
      });

      if (error) {
        console.error('Error analyzing code:', error);
        throw error;
      }

      if (!data?.analysis) {
        throw new Error('No analysis data received');
      }

      setAnalysis(data.analysis);
      toast({
        title: "Analysis Complete",
        description: "Your code has been analyzed successfully",
      });
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setAnalysis("");
    toast({
      title: "Cleared",
      description: "Input and analysis have been cleared",
    });
  };

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
            <div className="space-y-6 animate-fade-in-up">
              <CodeEditorSection
                code={code}
                isAnalyzing={isAnalyzing}
                onCodeChange={(value) => setCode(value || "")}
                onClear={handleClear}
              />
              
              <div className="flex justify-center">
                <Button
                  size="lg"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="relative px-8 py-6 text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Analyzing...
                    </span>
                  ) : (
                    "Analyze Code"
                  )}
                </Button>
              </div>

              <AnalysisResults analysis={analysis} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}