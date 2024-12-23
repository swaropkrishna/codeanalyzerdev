import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/dashboard/Navigation";
import { HistoryList } from "@/components/history/HistoryList";
import { SearchBar } from "@/components/history/SearchBar";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", searchQuery, currentPage],
    queryFn: async () => {
      console.log("Fetching notes with search query:", searchQuery);
      let query = supabase
        .from("Notes")
        .select("*")
        .order("created_at", { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      if (searchQuery) {
        query = query.or(
          `original_text.ilike.%${searchQuery}%,summary_text.ilike.%${searchQuery}%`
        );
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching notes:", error);
        throw error;
      }
      
      console.log("Fetched notes:", data);
      return data;
    },
  });

  const handleSearch = (query: string) => {
    console.log("Search query updated:", query);
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
              Meeting History
            </h1>
            <SearchBar onSearch={handleSearch} />
            <HistoryList 
              notes={notes || []} 
              isLoading={isLoading}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </main>
    </div>
  );
}