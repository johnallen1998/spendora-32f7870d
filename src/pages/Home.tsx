
import React from "react";
import { useAppContext } from "../context/AppContext";
import TimeFrameSelector from "../components/TimeFrameSelector";
import CategoryBadge from "../components/Category/CategoryBadge";
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
    <div className="px-4 pb-32 pt-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl text-gray-500">Hello,</h2>
          <h1 className="text-4xl font-bold mb-6">{userProfile.name}</h1>
        </div>
        <Link to="/profile">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-purple-500">
              {userProfile.name.charAt(0)}
            </span>
          </div>
        </Link>
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {/* Total Expenses Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className="text-gray-500 text-base mb-1">Total Expenses</p>
            <h3 className="text-3xl font-bold">{userProfile.currency.symbol}{getTotalExpenses().toFixed(2)}</h3>
          </div>

          {/* Generate cards for top 3 categories */}
          {categories.slice(0, 3).map(category => (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-3"
                style={{ backgroundColor: category.color }}
              >
                <CategoryIcon category={category.name} size={28} className="text-gray-700" />
              </div>
              <p className="text-gray-500 text-base mb-1 capitalize">{category.name}</p>
              <h3 className="text-3xl font-bold">
                {userProfile.currency.symbol}{getCategoryTotal(category.name).toFixed(2)}
              </h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Time Frame</h2>
        <TimeFrameSelector />
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Link to="/categories" className="text-purple-500 flex items-center">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {categories.slice(0, 4).map(category => (
            <CategoryBadge
              key={category.id}
              category={category.name}
              selected={selectedCategory === category.name}
              onClick={() => filterByCategory(selectedCategory === category.name ? null : category.name)}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Expenses</h2>
          <Link to="/expenses" className="text-purple-500 flex items-center">
            See All <ChevronRight size={16} />
          </Link>
        </div>
        {recentExpenses.length > 0 ? (
          recentExpenses.map(expense => (
            <ExpenseCard key={expense.id} expense={expense} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-8">No expenses found.</p>
        )}
      </section>
    </div>
  );
};

export default Home;
