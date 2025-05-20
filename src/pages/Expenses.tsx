
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ExpenseCard from "../components/ExpenseCard";
import { X } from "lucide-react";

const Expenses = () => {
  const navigate = useNavigate();
  const { getFilteredExpenses } = useAppContext();

  const expenses = getFilteredExpenses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold">All Expenses</h1>
          <div className="w-10"></div>
        </div>

        {expenses.length > 0 ? (
          <div>
            {expenses.map((expense, index) => (
              <ExpenseCard key={expense.id} expense={expense} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No expenses found.</p>
            <button 
              onClick={() => navigate('/add-expense')}
              className="mt-4 bg-purple-500 text-white px-6 py-2 rounded-full"
            >
              Add Expense
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
