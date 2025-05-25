
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
  const isDark = userProfile.theme === "dark";
  const recentExpenses = getFilteredExpenses().slice(0, 5);
  
  return (
    <div className={`px-4 pb-28 pt-6 min-h-screen ${isDark ? "bg-gray-950" : "bg-gray-50"}`}>
      <div className="flex justify-between items-center animate-fade-in mb-8">
        <div>
          <h2 className={`text-lg mb-1 ${isDark ? "text-gray-300" : "text-gray-500"}`}>Hello,</h2>
          <h1 className={`text-3xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{userProfile.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/profile" className="animate-scale-in">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDark ? "bg-purple-600" : "bg-purple-100"
            }`}>
              <span className={`text-lg font-semibold ${
                isDark ? "text-white" : "text-purple-500"
              }`}>
                {userProfile.name.charAt(0)}
              </span>
            </div>
          </Link>
        </div>
      </div>

      <section className="animate-fade-in">
        <h2 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Summary</h2>
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* Total Expenses Card */}
          <Card className={`p-4 shadow-sm hover:shadow-md transition-shadow rounded-xl animate-scale-in ${
            isDark 
              ? "bg-gray-900 border-gray-800 hover:bg-gray-800/50" 
              : "bg-white border-gray-200"
          }`}>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto ${
              isDark ? "bg-purple-600/20" : "bg-purple-100"
            }`}>
              <svg className={`w-6 h-6 ${isDark ? "text-purple-400" : "text-purple-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
            <p className={`text-xs mb-1 text-center ${isDark ? "text-gray-300" : "text-gray-500"}`}>Total Expenses</p>
            <h3 className={`text-xl font-bold text-center ${isDark ? "text-white" : "text-gray-900"}`}>
              {userProfile.currency.symbol}{getTotalExpenses().toFixed(2)}
            </h3>
          </Card>

          {/* Generate cards for top 3 categories */}
          {categories.slice(0, 3).map((category, index) => (
            <Card 
              key={category.id} 
              className={`p-4 shadow-sm hover:shadow-md transition-shadow rounded-xl animate-scale-in stagger-delay-${index + 1} ${
                isDark 
                  ? "bg-gray-900 border-gray-800 hover:bg-gray-800/50" 
                  : "bg-white border-gray-200"
              }`}
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto"
                style={{ backgroundColor: isDark ? `${category.color}40` : `${category.color}30` }}
              >
                <CategoryIcon 
                  category={category.name as Category} 
                  size={24} 
                  className={isDark ? "text-white" : "text-gray-700"} 
                />
              </div>
              <p className={`text-xs mb-1 capitalize truncate text-center ${isDark ? "text-gray-300" : "text-gray-500"}`}>
                {category.name}
              </p>
              <h3 className={`text-xl font-bold text-center ${isDark ? "text-white" : "text-gray-900"}`}>
                {userProfile.currency.symbol}{getCategoryTotal(category.name).toFixed(2)}
              </h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-8 animate-fade-in stagger-delay-2">
        <h2 className={`text-xl font-bold mb-3 ${isDark ? "text-white" : "text-gray-900"}`}>Time Frame</h2>
        <TimeFrameSelector />
      </section>

      <section className="mb-8 animate-fade-in stagger-delay-3">
        <div className="flex justify-between items-center mb-3">
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Categories</h2>
          <Link to="/categories" className={`flex items-center text-sm ${
            isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-500"
          }`}>
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
          <h2 className={`text-xl font-bold ${isDark ? "text-white" : "text-gray-900"}`}>Recent Expenses</h2>
          <Link to="/expenses" className={`flex items-center text-sm ${
            isDark ? "text-purple-400 hover:text-purple-300" : "text-purple-500"
          }`}>
            See All <ChevronRight size={16} />
          </Link>
        </div>
        {recentExpenses.length > 0 ? (
          recentExpenses.map((expense, index) => (
            <ExpenseCard key={expense.id} expense={expense} index={index} />
          ))
        ) : (
          <p className={`text-center py-6 ${isDark ? "text-gray-300" : "text-gray-500"}`}>
            No expenses found.
          </p>
        )}
      </section>
    </div>
  );
};

export default Home;
