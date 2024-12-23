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
      <div className="flex justify-center items-center py-12">
        <div className="animate-pulse text-gray-500">Loading summaries...</div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No summaries found.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(notes.length / itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Meeting on {format(new Date(note.created_at), "MMM d, yyyy")}
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(note.created_at), "h:mm a")}
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate(`/summary/${note.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Summary
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}