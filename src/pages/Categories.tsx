
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, Plus, Trash2 } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import CategoryIcon from "../components/Category/CategoryIcon";
import { toast } from "@/hooks/use-toast";

const colorOptions = [
  "#F2FCE2", // Soft Green
  "#FEF7CD", // Soft Yellow
  "#FEC6A1", // Soft Orange
  "#E5DEFF", // Soft Purple
  "#FFDEE2", // Soft Pink
  "#FDE1D3", // Soft Peach
  "#D3E4FD", // Soft Blue
  "#F1F0FB", // Soft Gray
  "#8B5CF6", // Vivid Purple
  "#D946EF", // Magenta Pink
  "#F97316", // Bright Orange
  "#0EA5E9", // Ocean Blue
];

const Categories = () => {
  const navigate = useNavigate();
  const { categories, addCategory, deleteCategory } = useAppContext();
  const [openSheet, setOpenSheet] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  const handleAddCategory = () => {
    if (newCategoryName.trim() === "") {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    // Check for duplicate category name
    if (categories.some(cat => cat.name.toLowerCase() === newCategoryName.toLowerCase())) {
      toast({
        title: "Error",
        description: "A category with this name already exists",
        variant: "destructive"
      });
      return;
    }
    
    addCategory({
      name: newCategoryName.toLowerCase(),
      color: selectedColor,
      icon: "shopping-cart"
    });
    
    toast({
      title: "Category Added",
      description: `${newCategoryName} has been added as a new category`
    });
    
    setNewCategoryName("");
    setSelectedColor(colorOptions[0]);
    setOpenSheet(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (["groceries", "food", "transportation", "entertainment"].includes(id)) {
      toast({
        title: "Cannot Delete",
        description: "Default categories cannot be deleted",
        variant: "destructive"
      });
      return;
    }
    
    deleteCategory(id);
    toast({
      title: "Category Deleted",
      description: "The category has been deleted"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold">Categories</h1>
          <button onClick={() => setOpenSheet(true)} className="p-2">
            <Plus size={24} />
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg divide-y">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
                  style={{ backgroundColor: category.color }}
                >
                  <CategoryIcon category={category.name} size={20} />
                </div>
                <span className="capitalize">{category.name}</span>
              </div>
              <button 
                onClick={() => handleDeleteCategory(category.id)}
                className={`p-2 ${["groceries", "food", "transportation", "entertainment"].includes(category.id) ? "text-gray-300" : "text-red-500"}`}
                disabled={["groceries", "food", "transportation", "entertainment"].includes(category.id)}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Sheet open={openSheet} onOpenChange={setOpenSheet}>
        <SheetContent side="bottom" className="h-[60%]">
          <SheetHeader className="mb-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-2xl">Add Category</SheetTitle>
              <button onClick={() => setOpenSheet(false)} className="text-gray-500">
                Cancel
              </button>
            </div>
          </SheetHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category Name</label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category Color</label>
              <div className="grid grid-cols-6 gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full ${selectedColor === color ? "ring-2 ring-purple-500" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleAddCategory}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
              >
                Add Category
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Categories;
