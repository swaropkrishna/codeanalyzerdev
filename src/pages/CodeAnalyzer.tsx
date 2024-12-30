import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function CodeAnalyzer() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Check initial auth state
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsAuthenticated(!!session);
  });

  // Subscribe to auth state changes
  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    setIsAuthenticated(!!session);
  });

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      navigate("/auth");
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
      const response = await fetch("/api/analyze-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze code");
      }

      const data = await response.json();
      toast({
        title: "Analysis Complete",
        description: "Your code has been analyzed successfully",
      });
      // Handle the analysis results here
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Analyze Your Code with AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Get instant insights and suggestions to improve your code quality using advanced AI analysis.
            </p>
            <div className="space-y-4">
              <Textarea
                placeholder="Paste your code here..."
                className="min-h-[200px] font-mono"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button
                className="w-full md:w-auto"
                size="lg"
                onClick={handleAnalyze}
                disabled={isAnalyzing}
              >
                {isAnalyzing ? "Analyzing..." : "Analyze Code"}
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}