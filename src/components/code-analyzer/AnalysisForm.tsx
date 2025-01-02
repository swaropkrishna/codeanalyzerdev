import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CodeEditorSection } from "./CodeEditorSection";
import { AnalysisResults } from "./AnalysisResults";

export function AnalysisForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleAnalyze = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to analyze code",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setIsAnalyzing(true);
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      if (!userId) {
        throw new Error('User not found');
      }

      console.log('Checking user record for:', userId);
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (userError) {
        console.error('Error fetching user:', userError);
        throw userError;
      }

      // If user record doesn't exist, create it
      if (!userData) {
        console.log('Creating user record for:', userId);
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert([{ 
            id: userId,
            subscription_tier: 'free',
            analysis_count: 0,
            max_analysis_count: 1
          }])
          .select()
          .maybeSingle();

        if (createError) {
          console.error('Error creating user record:', createError);
          throw createError;
        }

        if (!newUser) {
          throw new Error('Failed to create user record');
        }
      }

      console.log('Updating analysis count for user:', userId);
      const { data: updatedUser, error: updateError } = await supabase
        .from('users')
        .update({ analysis_count: undefined }) // Trigger the check_analysis_limits function
        .eq('id', userId)
        .select()
        .maybeSingle();

      if (updateError) {
        console.error('Error updating analysis count:', updateError);
        
        // Check if it's a limit reached error
        if (updateError.message.includes('Free tier limit reached')) {
          toast({
            title: "Free Tier Limit Reached",
            description: "Please upgrade to Pro or Plus to continue analyzing code",
            variant: "destructive",
          });
          navigate("/pricing");
          return;
        } else if (updateError.message.includes('Pro tier limit reached')) {
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

      if (!updatedUser) {
        console.error('Updated user record not found');
        toast({
          title: "Error",
          description: "User record not found. Please try signing out and back in.",
          variant: "destructive",
        });
        return;
      }

      console.log('Invoking analyze-code function');
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
  );
}