import { Navigation } from "@/components/dashboard/Navigation";
import { NoteInput } from "@/components/dashboard/NoteInput";
import { SummaryCard } from "@/components/dashboard/SummaryCard";
import { UsageLimit } from "@/components/dashboard/UsageLimit";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import { FileUpload } from "@/components/dashboard/FileUpload";

export default function Dashboard() {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-grow container mx-auto max-w-4xl py-6 px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          <div className="bg-card rounded-lg shadow-lg p-6 animate-fade-in">
            <NoteInput />
            <FileUpload />
            {summary && <SummaryCard summary={summary} />}
            <UsageLimit />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}