import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function CodeAnalyzer() {
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const analyzeCode = async () => {
    if (!code.trim()) {
      toast({
        title: "Error",
        description: "Please enter some code to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke('analyze-code', {
        body: { code }
      });

      if (error) throw error;

      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing code:', error);
      toast({
        title: "Error",
        description: "Failed to analyze code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Code Analyzer</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="space-y-2">
          <label htmlFor="code" className="block text-sm font-medium">
            Enter your code:
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-4 border rounded-md font-mono bg-gray-50"
            placeholder="Paste your code here..."
          />
        </div>
        
        <Button 
          onClick={analyzeCode} 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze Code"}
        </Button>

        {analysis && (
          <div className="mt-8 p-4 border rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Analysis Result:</h2>
            <div className="whitespace-pre-wrap font-mono">{analysis}</div>
          </div>
        )}
      </div>
    </div>
  );
}