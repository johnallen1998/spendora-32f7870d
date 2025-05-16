
import React from "react";
import { useAppContext } from "../context/AppContext";
import TimeFrameSelector from "../components/TimeFrameSelector";
import CategoryBadge from "../components/Category/CategoryBadge";
import CategoryIcon from "../components/Category/CategoryIcon";
import ExpenseCard from "../components/ExpenseCard";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Category } from "../types/expenses";
import { toast } from "@/components/ui/use-toast";

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

  const recentExpenses = getFilteredExpenses().slice(0, 5);
  
  return (
    <div className="px-3 md:px-4 pb-32 pt-3 md:pt-4">
      <div className="flex justify-between items-center animate-fade-in">
        <div>
          <h2 className="text-lg md:text-2xl text-gray-500">Hello,</h2>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">{userProfile.name}</h1>
        </div>
        <Link to="/profile" className="animate-scale-in">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-lg md:text-xl font-semibold text-purple-500">
              {userProfile.name.charAt(0)}
            </span>
          </div>
        </Link>
      </div>

      <section className="animate-fade-in stagger-delay-1">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Summary</h2>
        <div className="grid grid-cols-2 gap-2 md:gap-4 mb-6 md:mb-8 mobile-grid">
          {/* Total Expenses Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm mobile-compact animate-scale-in">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-100 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto mobile-icon-sm">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className="text-gray-500 text-xs md:text-base mb-1 mobile-text-sm">Total Expenses</p>
            <h3 className="text-xl md:text-3xl font-bold">{userProfile.currency.symbol}{getTotalExpenses().toFixed(2)}</h3>
          </div>

          {/* Generate cards for top 3 categories */}
          {categories.slice(0, 3).map((category, index) => (
            <div key={category.id} className={`bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 shadow-sm mobile-compact animate-scale-in stagger-delay-${index + 1}`}>
              <div 
                className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2 md:mb-3 mx-auto mobile-icon-sm"
                style={{ backgroundColor: category.color }}
              >
                <CategoryIcon category={category.name} size={20} className="text-gray-700" />
              </div>
              <p className="text-gray-500 text-xs md:text-base mb-1 capitalize mobile-text-sm truncate">{category.name}</p>
              <h3 className="text-xl md:text-3xl font-bold">
                {userProfile.currency.symbol}{getCategoryTotal(category.name).toFixed(2)}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6 md:mb-8 animate-fade-in stagger-delay-2">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Time Frame</h2>
        <TimeFrameSelector />
      </section>

      <section className="mb-6 md:mb-8 animate-fade-in stagger-delay-3">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Categories</h2>
          <Link to="/categories" className="text-purple-500 flex items-center text-sm md:text-base">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2 animate-slide-in">
          {categories.slice(0, 4).map((category, index) => (
            <CategoryBadge
              key={category.id}
              category={category.name}
              selected={selectedCategory === category.name}
              onClick={() => filterByCategory(selectedCategory === category.name ? null : category.name)}
              className={`stagger-delay-${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="animate-fade-in stagger-delay-4">
        <div className="flex justify-between items-center mb-3 md:mb-4">
          <h2 className="text-xl md:text-2xl font-bold">Recent Expenses</h2>
          <Link to="/expenses" className="text-purple-500 flex items-center text-sm md:text-base">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense, index) => (
            <ExpenseCard key={expense.id} expense={expense} index={index} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-6 md:py-8">No expenses found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
