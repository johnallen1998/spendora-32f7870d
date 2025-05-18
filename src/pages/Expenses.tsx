
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ExpenseCard from "../components/ExpenseCard";
import { X, Filter, SortAscending, RefreshCw } from "lucide-react";
import SearchBar from "../components/SearchBar";
import SortOptions from "../components/SortOptions";
import QuickAdd from "../components/QuickAdd";
import { Button } from "@/components/ui/button";
import TimeFrameSelector from "../components/TimeFrameSelector";
import CategoryBadge from "../components/Category/CategoryBadge";

const Expenses = () => {
  const navigate = useNavigate();
  const { 
    getFilteredExpenses, 
    clearFilters, 
    selectedCategory,
    filterByCategory,
    categories,
    selectedTimeFrame
  } = useAppContext();
  const [showFilters, setShowFilters] = useState(false);

  const expenses = getFilteredExpenses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold">All Expenses</h1>
          <div className="w-10"></div>
        </div>

        <div className="mb-4">
          <SearchBar className="w-full mb-3" />
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} /> Filters
            </Button>
            
            <div className="flex items-center gap-2">
              <SortOptions />
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9" 
                onClick={clearFilters}
                title="Clear all filters"
              >
                <RefreshCw size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {showFilters && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm animate-fade-in">
            <h3 className="font-medium mb-2">Time Frame</h3>
            <TimeFrameSelector />
            
            <h3 className="font-medium mb-2 mt-4">Categories</h3>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((category) => (
                <CategoryBadge
                  key={category.id}
                  category={category.name}
                  selected={selectedCategory === category.name}
                  onClick={() => filterByCategory(selectedCategory === category.name ? null : category.name)}
                />
              ))}
            </div>
          </div>
        )}

        <div className="mt-4">
          {expenses.length > 0 ? (
            <div>
              {expenses.map((expense, index) => (
                <ExpenseCard key={expense.id} expense={expense} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No expenses found.</p>
              <Button 
                onClick={() => navigate('/add-expense')}
                className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full"
              >
                Add Expense
              </Button>
            </div>
          )}
        </div>
        
        <QuickAdd />
      </div>
    </div>
  );
};

export default Expenses;
