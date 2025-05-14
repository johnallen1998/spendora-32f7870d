
import React from "react";
import { Expense } from "../types/expenses";
import { useAppContext } from "../context/AppContext";
import CategoryIcon from "./Category/CategoryIcon";
import { format } from "date-fns";

interface ExpenseCardProps {
  expense: Expense;
}

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense }) => {
  const { userProfile, getCategoryInfo } = useAppContext();
  const { currency } = userProfile;
  const categoryInfo = getCategoryInfo(expense.category);
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 mb-3 shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
          style={{ backgroundColor: categoryInfo.color }}
        >
          <CategoryIcon category={expense.category} />
        </div>
        <div>
          <h3 className="font-semibold">{expense.title}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">{expense.category}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-bold text-lg">{currency.symbol}{expense.amount.toFixed(2)}</p>
        <p className="text-xs text-gray-500">{format(new Date(expense.date), "d MMM yyyy")}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
