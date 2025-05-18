
import React, { useState } from "react";
import { Search } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { toast } from "@/components/ui/sonner";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = "", 
  placeholder = "Search expenses...",
  onSearch
}) => {
  const [query, setQuery] = useState("");
  const { searchExpenses } = useAppContext();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.info("Please enter a search term");
      return;
    }
    
    const results = searchExpenses(query);
    
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <button 
          type="submit"
          className="absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <Search size={18} className="text-gray-400" />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
