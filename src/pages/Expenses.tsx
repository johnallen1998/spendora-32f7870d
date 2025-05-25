
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import ExpenseCard from "../components/ExpenseCard";
import { X, Plus, TrendingUp } from "lucide-react";

const Expenses = () => {
  const navigate = useNavigate();
  const { getFilteredExpenses, selectedTimeFrame } = useAppContext();

  const expenses = getFilteredExpenses();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Go back"
          >
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold">All Expenses</h1>
          <div className="w-10"></div>
        </div>

        {/* Time frame indicator */}
        <div className="mb-4">
          <div className="bg-purple-100 dark:bg-purple-900 rounded-full px-4 py-2 text-sm text-purple-700 dark:text-purple-300 inline-block">
            {selectedTimeFrame.replace("-", " ")} • {expenses.length} expense{expenses.length !== 1 ? 's' : ''}
          </div>
        </div>

        {expenses.length > 0 ? (
          <div className="space-y-3">
            {expenses.map((expense, index) => (
              <ExpenseCard key={expense.id} expense={expense} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <TrendingUp size={64} className="mx-auto opacity-50" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
              No expenses found
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              You haven't added any expenses for {selectedTimeFrame.replace("-", " ")} yet. Start tracking your spending!
            </p>
            <button 
              onClick={() => navigate('/add-expense')}
              className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-colors font-medium"
            >
              <Plus size={20} />
              Add Your First Expense
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
