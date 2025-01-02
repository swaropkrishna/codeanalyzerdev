import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";

interface CodeEditorSectionProps {
  code: string;
  isAnalyzing: boolean;
  onCodeChange: (value: string | undefined) => void;
  onClear: () => void;
}

export function CodeEditorSection({ 
  code, 
  isAnalyzing, 
  onCodeChange, 
  onClear 
}: CodeEditorSectionProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur"></div>
      <div className="relative rounded-lg overflow-hidden border border-border/50 bg-card shadow-xl">
        <div className="flex justify-end p-2 border-b border-border/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear
          </Button>
        </div>
        <div className="h-[500px] w-full">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-light"
            value={code}
            onChange={onCodeChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: "on",
              roundedSelection: false,
              scrollBeyondLastLine: false,
              readOnly: isAnalyzing,
              automaticLayout: true,
              padding: { top: 16, bottom: 16 },
            }}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}