
import React from "react";
import { Expense } from "../types/expenses";
import { useAppContext } from "../context/AppContext";
import CategoryIcon from "./Category/CategoryIcon";
import { format } from "date-fns";

interface ExpenseCardProps {
  expense: Expense;
  index?: number;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, index = 0 }) => {
  const { userProfile, getCategoryInfo } = useAppContext();
  const { currency } = userProfile;
  const categoryInfo = getCategoryInfo(expense.category);
  
  // Stagger animation delay based on index
  const delayClass = `stagger-delay-${(index % 4) + 1}`;
  
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg p-4 mb-3 shadow-sm flex justify-between items-center animate-fade-in ${delayClass} hover:shadow-md transition-shadow`}>
      <div className="flex items-center">
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 animate-scale-in"
          style={{ backgroundColor: categoryInfo.color }}
        >
          <CategoryIcon category={expense.category} size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-sm md:text-base">{expense.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs md:text-sm capitalize">{expense.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-sm md:text-lg">{currency.symbol}{expense.amount.toFixed(2)}</p>
        <p className="text-[10px] md:text-xs text-gray-500">{format(new Date(expense.date), "d MMM yyyy")}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
