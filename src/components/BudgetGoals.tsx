
import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CategoryIcon from "./Category/CategoryIcon";
import { Pencil } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const BudgetGoals: React.FC = () => {
  const { categories, getCategoryInfo, getCategoryTotal, setBudgetLimit, getBudgetLimit } = useAppContext();
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [budgetAmount, setBudgetAmount] = useState<number>(0);
  
  const handleEditBudget = (categoryId: string, currentBudget: number) => {
    setEditingCategory(categoryId);
    setBudgetAmount(currentBudget);
  };
  
  const handleSaveBudget = (categoryId: string) => {
    setBudgetLimit(categoryId, budgetAmount);
    setEditingCategory(null);
    toast.success("Budget limit updated");
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Budget Goals</h2>
      
      {categories.map((category) => {
        const info = getCategoryInfo(category.name);
        const spent = getCategoryTotal(category.name);
        const budget = getBudgetLimit(category.id);
        const percentage = budget > 0 ? Math.min(Math.round((spent / budget) * 100), 100) : 0;
        const isOverBudget = budget > 0 && spent > budget;
        
        return (
          <Card key={category.id} className="p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: `${info.color}30` }}
                >
                  <CategoryIcon category={category.name} size={16} />
                </div>
                <span className="font-medium capitalize">{category.name}</span>
              </div>
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleEditBudget(category.id, budget)}
                className="h-8 w-8"
              >
                <Pencil size={16} />
              </Button>
            </div>
            
            {editingCategory === category.id ? (
              <div className="flex items-center mt-2">
                <input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  className="w-full p-2 border rounded-md mr-2"
                  placeholder="Set budget amount"
                />
                <Button onClick={() => handleSaveBudget(category.id)}>Save</Button>
              </div>
            ) : (
              <>
                <div className="flex justify-between text-sm mb-1">
                  <span className={isOverBudget ? "text-red-500 font-semibold" : ""}>
                    {spent.toFixed(2)}
                  </span>
                  {budget > 0 && (
                    <span>{budget.toFixed(2)}</span>
                  )}
                </div>
                
                <Progress 
                  value={percentage} 
                  className={`h-2 ${isOverBudget ? "bg-red-200" : "bg-gray-200"}`}
                />
                
                {!budget && (
                  <p className="text-xs text-gray-500 mt-1">No budget set</p>
                )}
                
                {isOverBudget && (
                  <p className="text-xs text-red-500 mt-1">Over budget by {(spent - budget).toFixed(2)}</p>
                )}
              </>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default BudgetGoals;
