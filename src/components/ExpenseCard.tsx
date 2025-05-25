
import React from "react";
import { Expense } from "../types/expenses";
import { useAppContext } from "../context/AppContext";
import CategoryIcon from "./Category/CategoryIcon";
import { format } from "date-fns";
import { useIsMobile } from "../hooks/use-mobile";

interface ExpenseCardProps {
  expense: Expense;
  index?: number;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, index = 0 }) => {
  const { userProfile, getCategoryInfo } = useAppContext();
  const { currency } = userProfile;
  const categoryInfo = getCategoryInfo(expense.category);
  const isMobile = useIsMobile();
  const isDark = userProfile.theme === "dark";
  
  // Stagger animation delay based on index
  const delayClass = `stagger-delay-${(index % 4) + 1}`;
  
  return (
    <div 
      className={`p-3 mb-3 shadow-sm flex justify-between items-center rounded-xl animate-fade-in ${delayClass} hover:shadow-md transition-all hover:translate-y-[-2px] ${
        isDark 
          ? "bg-gray-900 border-gray-800 hover:bg-gray-800/50" 
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: categoryInfo ? (isDark ? `${categoryInfo.color}40` : `${categoryInfo.color}30`) : (isDark ? '#F2FCE240' : '#F2FCE230') }}
        >
          <CategoryIcon 
            category={expense.category} 
            size={isMobile ? 18 : 20}
            className={isDark ? "text-white" : "text-gray-700"}
          />
        </div>
        <div>
          <h3 className={`font-semibold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
            {expense.title}
          </h3>
          <p className={`text-xs capitalize ${isDark ? "text-gray-300" : "text-gray-500"}`}>
            {typeof expense.category === 'string' ? expense.category : 'groceries'}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold text-sm ${isDark ? "text-white" : "text-gray-900"}`}>
          {currency.symbol}{expense.amount.toFixed(2)}
        </p>
        <p className={`text-[10px] ${isDark ? "text-gray-300" : "text-gray-500"}`}>
          {format(new Date(expense.date), "d MMM yyyy")}
        </p>
      </div>
    </div>
  );
};

export default ExpenseCard;
