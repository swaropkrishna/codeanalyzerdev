import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface SummaryCardProps {
  summary: string;
}

export const SummaryCard = ({ summary }: SummaryCardProps) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    toast({
      title: "Copied!",
      description: "Summary copied to clipboard",
    });
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([summary], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "summary.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <Card className="mt-6 bg-card border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold text-primary">AI-Generated Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-secondary-foreground leading-relaxed whitespace-pre-wrap">
            {summary}
          </p>
        </div>
        <div className="flex space-x-4 justify-end">
          <Button 
            variant="outline" 
            onClick={handleCopy} 
            className="hover:bg-primary/10"
            size="sm"
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button 
            variant="outline" 
            onClick={handleDownload} 
            className="hover:bg-primary/10"
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};