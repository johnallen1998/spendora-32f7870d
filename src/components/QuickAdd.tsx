
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Plus, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const QuickAdd: React.FC = () => {
  const { addExpense, userProfile, categories } = useAppContext();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]?.name || "groceries");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !amount) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const newExpense = {
      title,
      amount: parseFloat(amount),
      category,
      date: new Date()
    };
    
    addExpense(newExpense);
    toast.success("Expense added successfully!");
    
    // Reset form
    setTitle("");
    setAmount("");
    setCategory(categories[0]?.name || "groceries");
    setOpen(false);
  };
  
  return (
    <>
      <Button
        className="fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg bg-purple-500 hover:bg-purple-600 text-white"
        onClick={() => setOpen(true)}
      >
        <Plus size={24} />
      </Button>
      
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Quick Add Expense</DialogTitle>
            <DialogDescription>
              Add a new expense quickly.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="Coffee, Lunch, etc."
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="text-sm font-medium">
                Amount ({userProfile.currency.symbol})
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded-md mt-1"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="text-sm font-medium">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md mt-1 capitalize"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name} className="capitalize">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex items-center">
                <X size={16} className="mr-1" /> Cancel
              </Button>
              <Button type="submit" className="flex items-center">
                <Plus size={16} className="mr-1" /> Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickAdd;
