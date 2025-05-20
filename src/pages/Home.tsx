
import React from "react";
import { useAppContext } from "../context/AppContext";
import TimeFrameSelector from "../components/TimeFrameSelector";
import CategoryBadge from "../components/Category/CategoryBadge";
import CategoryIcon from "../components/Category/CategoryIcon";
import ExpenseCard from "../components/ExpenseCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Category } from "../types/expenses";
import { useIsMobile } from "../hooks/use-mobile";
import { Card } from "@/components/ui/card";

const Home: React.FC = () => {
  const { 
    userProfile, 
    getFilteredExpenses, 
    getCategoryTotal, 
    getTotalExpenses, 
    selectedCategory, 
    filterByCategory,
    categories
  } = useAppContext();

  const isMobile = useIsMobile();
  const recentExpenses = getFilteredExpenses().slice(0, 5);
  
  return (
    <div className="px-4 pb-28 pt-6">
      <div className="flex justify-between items-center animate-fade-in mb-8">
        <div>
          <h2 className="text-lg text-gray-500 mb-1">Hello,</h2>
          <h1 className="text-3xl font-bold">{userProfile.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="animate-scale-in">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-lg font-semibold text-purple-500">
                {userProfile.name.charAt(0)}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <section className="animate-fade-in">
        <h2 className="text-xl font-bold mb-3">Summary</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Total Expenses Card */}
          <Card className="p-4 shadow-sm hover:shadow-md transition-shadow rounded-xl animate-scale-in bg-opacity-50">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3 mx-auto">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className="text-gray-500 text-xs mb-1 text-center">Total Expenses</p>
            <h3 className="text-xl font-bold text-center">{userProfile.currency.symbol}{getTotalExpenses().toFixed(2)}</h3>
          </Card>

          {/* Generate cards for top 3 categories */}
          {categories.slice(0, 3).map((category, index) => (
            <Card 
              key={category.id} 
              className={`p-4 shadow-sm hover:shadow-md transition-shadow rounded-xl animate-scale-in stagger-delay-${index + 1} bg-opacity-50`}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto"
                style={{ backgroundColor: `${category.color}30` }}
              >
                <CategoryIcon 
                  category={category.name as Category} 
                  size={24} 
                  className="text-gray-700 dark:text-gray-200" 
                />
              </div>
              <p className="text-gray-500 text-xs mb-1 capitalize truncate text-center">{category.name}</p>
              <h3 className="text-xl font-bold text-center">
                {userProfile.currency.symbol}{getCategoryTotal(category.name).toFixed(2)}
              </h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8 animate-fade-in stagger-delay-2">
        <h2 className="text-xl font-bold mb-3">Time Frame</h2>
        <TimeFrameSelector />
      </section>

      <section className="mb-8 animate-fade-in stagger-delay-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Categories</h2>
          <Link to="/categories" className="text-purple-500 flex items-center text-sm">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2 animate-slide-in">
          {categories.slice(0, 4).map((category, index) => (
            <CategoryBadge
              key={category.id}
              category={category.name as Category}
              selected={selectedCategory === category.name}
              onClick={() => filterByCategory(selectedCategory === category.name ? null : category.name)}
              className={`stagger-delay-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="animate-fade-in stagger-delay-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold">Recent Expenses</h2>
          <Link to="/expenses" className="text-purple-500 flex items-center text-sm">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense, index) => (
            <ExpenseCard key={expense.id} expense={expense} index={index} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">No expenses found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
