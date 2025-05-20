
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
  
  // Stagger animation delay based on index
  const delayClass = `stagger-delay-${(index % 4) + 1}`;
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-xl p-3 mb-3 shadow-sm flex justify-between items-center 
        animate-fade-in ${delayClass} hover:shadow-md transition-all hover:translate-y-[-2px]`}
    >
      <div className="flex items-center">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
          style={{ backgroundColor: `${categoryInfo.color}30` }}
        >
          <CategoryIcon 
            category={expense.category} 
            size={isMobile ? 18 : 20}
            className="text-gray-700 dark:text-gray-200"
          />
        </div>
        <div>
          <h3 className="font-semibold text-sm">{expense.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs capitalize">{expense.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm">{currency.symbol}{expense.amount.toFixed(2)}</p>
        <p className="text-[10px] text-gray-500">{format(new Date(expense.date), "d MMM yyyy")}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
