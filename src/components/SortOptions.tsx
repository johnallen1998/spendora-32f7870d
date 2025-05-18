
import React from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, SortAscending, SortDescending } from "lucide-react";

const SortOptions: React.FC = () => {
  const { sortOption, setSortOption } = useAppContext();

  const sortOptions = [
    { value: "date-desc", label: "Newest first" },
    { value: "date-asc", label: "Oldest first" },
    { value: "amount-desc", label: "Highest amount" },
    { value: "amount-asc", label: "Lowest amount" },
    { value: "title", label: "Title (A-Z)" }
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-3 py-1 h-9 text-sm">
          {sortOption === "date-desc" || sortOption === "amount-desc" ? (
            <SortDescending size={16} className="mr-1" />
          ) : (
            <SortAscending size={16} className="mr-1" />
          )}
          Sort
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          {sortOptions.map((option) => (
            <div 
              key={option.value} 
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                sortOption === option.value ? "bg-gray-100 dark:bg-gray-800" : ""
              }`}
              onClick={() => setSortOption(option.value as any)}
            >
              <span>{option.label}</span>
              {sortOption === option.value && <Check size={16} />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortOptions;
