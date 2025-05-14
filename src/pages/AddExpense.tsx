
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../types/expenses";
import { useAppContext } from "../context/AppContext";
import { Input } from "@/components/ui/input";
import CategoryBadge from "../components/Category/CategoryBadge";
import { Button } from "@/components/ui/button";
import { X, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddExpense: React.FC = () => {
  const { userProfile, addExpense } = useAppContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [amount, setAmount] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<Category | null>(null);
  const [date, setDate] = useState<Date>(new Date());
  const [notes, setNotes] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  
  const categories: Category[] = ["groceries", "food", "transportation", "entertainment"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount.",
        variant: "destructive"
      });
      return;
    }
    
    addExpense({
      title,
      amount: numericAmount,
      category,
      date,
      notes: notes || undefined
    });
    
    toast({
      title: "Expense Added",
      description: "Your expense has been saved successfully."
    });
    
    navigate("/");
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold">Add Expense</h1>
          <div className="w-8"></div> {/* Placeholder for alignment */}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-xl font-medium block mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl">
                {userProfile.currency.symbol}
              </span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 text-3xl py-6"
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div>
            <label className="text-xl font-medium block mb-2">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="py-6"
              placeholder="Expense title"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xl font-medium">Category</label>
              <button 
                type="button" 
                className="text-purple-500"
                onClick={() => {/* Manage categories */}}
              >
                Manage
              </button>
            </div>
            <div className="flex justify-between">
              {categories.map((cat) => (
                <CategoryBadge
                  key={cat}
                  category={cat}
                  selected={category === cat}
                  onClick={() => setCategory(cat)}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-xl font-medium block mb-2">Date</label>
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg py-4 px-4 flex items-center"
            >
              <Calendar className="mr-2" size={24} />
              <span>{formatDate(date)}</span>
            </button>
            {showDatePicker && (
              <div className="mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg">
                <input
                  type="datetime-local"
                  onChange={(e) => setDate(new Date(e.target.value))}
                  className="w-full p-2 border rounded"
                  value={date.toISOString().slice(0, 16)}
                />
              </div>
            )}
          </div>
          
          <div>
            <label className="text-xl font-medium block mb-2">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border rounded-lg p-4 min-h-[100px]"
              placeholder="Add details here..."
            ></textarea>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white py-6 text-xl"
          >
            Add Expense
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
