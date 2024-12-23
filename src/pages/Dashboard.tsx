import { Navigation } from "@/components/dashboard/Navigation";
import { NoteInput } from "@/components/dashboard/NoteInput";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { UsageLimit } from "@/components/dashboard/UsageLimit";
import { useState } from "react";

export default function Dashboard() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-card rounded-lg shadow-lg p-6">
            <NoteInput />
            {summary && <div className="mt-8"><SummaryCard summary={summary} /></div>}
            <UsageLimit />
          </div>
        </div>
      </main>
    </div>
  );
}