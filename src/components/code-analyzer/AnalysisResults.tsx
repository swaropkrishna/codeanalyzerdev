import ReactMarkdown from 'react-markdown';

interface AnalysisResultsProps {
  analysis: string;
}

export function AnalysisResults({ analysis }: AnalysisResultsProps) {
  if (!analysis) return null;

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-border/50">
      <h2 className="text-2xl font-semibold mb-4">Analysis Results</h2>
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </div>
    </div>
  );
}