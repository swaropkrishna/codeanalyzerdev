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
    <Card className="mt-6 bg-card animate-fade-in-up">
      <CardHeader>
        <CardTitle className="text-foreground">AI-Generated Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-secondary-foreground mb-4 leading-relaxed">{summary}</p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleCopy} className="border-secondary hover:bg-secondary">
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>
          <Button variant="outline" onClick={handleDownload} className="border-secondary hover:bg-secondary">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};