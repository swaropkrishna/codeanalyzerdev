import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

interface Note {
  id: string;
  created_at: string;
  original_text: string;
  summary_text: string;
}

interface HistoryListProps {
  notes: Note[];
  isLoading: boolean;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

export function HistoryList({ 
  notes, 
  isLoading,
  currentPage,
  itemsPerPage,
  onPageChange,
}: HistoryListProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px] py-section">
        <div className="animate-pulse text-xl text-gray-500">Loading summaries...</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] py-section">
        <p className="text-xl text-gray-500 mb-4">No summaries found.</p>
        <p className="text-base text-muted-foreground">Start by creating a new summary in the dashboard.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(notes.length / itemsPerPage);

  return (
    <div className="space-y-8">
      <div className="grid gap-6">
        {notes.map((note) => (
          <Card 
            key={note.id} 
            className="p-8 hover:shadow-lg transition-shadow duration-300 border-2"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-foreground">
                  Meeting on {format(new Date(note.created_at), "MMM d, yyyy")}
                </h3>
                <p className="text-lg text-muted-foreground">
                  {format(new Date(note.created_at), "h:mm a")}
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => navigate(`/summary/${note.id}`)}
                className="min-w-[160px] h-14 text-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <Eye className="mr-3 h-6 w-6" />
                View Summary
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={`text-lg ${currentPage === 1 ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                  className="text-lg h-12 w-12"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={`text-lg ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}