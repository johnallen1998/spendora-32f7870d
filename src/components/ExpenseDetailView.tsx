
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Expense } from "../types/expenses";
import { format } from "date-fns";
import { useAppContext } from "../context/AppContext";
import CategoryIcon from "./Category/CategoryIcon";
import { Trash2, X } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ExpenseDetailViewProps {
  expense: Expense | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ExpenseDetailView: React.FC<ExpenseDetailViewProps> = ({ expense, open, onOpenChange }) => {
  const { userProfile, deleteExpense, getCategoryInfo } = useAppContext();
  
  if (!expense) return null;
  
  const categoryInfo = getCategoryInfo(expense.category);
  
  const handleDelete = () => {
    deleteExpense(expense.id);
    onOpenChange(false);
    toast.success("Expense deleted");
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            Expense Details
          </DialogTitle>
          <DialogDescription>
            View the details of your expense.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${categoryInfo.color}30` }}
            >
              <CategoryIcon category={expense.category} size={32} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Title</p>
              <p className="text-lg font-semibold">{expense.title}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Amount</p>
              <p className="text-lg font-semibold">{userProfile.currency.symbol}{expense.amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
              <p className="text-lg font-semibold capitalize">{expense.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
              <p className="text-lg font-semibold">{format(new Date(expense.date), "d MMM yyyy")}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between">
          <Button variant="destructive" onClick={handleDelete} className="flex items-center">
            <Trash2 size={16} className="mr-1" /> Delete
          </Button>
          <Button onClick={() => onOpenChange(false)} className="flex items-center">
            <X size={16} className="mr-1" /> Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseDetailView;
