import { Button } from "@/components/ui/button";
import Editor from "@monaco-editor/react";
import { X } from "lucide-react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  onClear: () => void;
  isAnalyzing: boolean;
}

export function CodeEditor({ code, onChange, onClear, isAnalyzing }: CodeEditorProps) {
  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg blur"></div>
      <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-border/50 bg-card shadow-xl">
        {code && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={onClear}
            title="Clear input and analysis"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        <Editor
          height="100%"
          defaultLanguage="javascript"
          theme="vs-light"
          value={code}
          onChange={onChange}
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
  );
}