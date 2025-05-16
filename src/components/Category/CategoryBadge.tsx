
import React from "react";
import { Category } from "../../types/expenses";
import CategoryIcon from "./CategoryIcon";
import { useAppContext } from "../../context/AppContext";

interface CategoryBadgeProps {
  category: Category;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ 
  category, 
  selected = false, 
  onClick,
  className = ""
}) => {
  const { getCategoryInfo } = useAppContext();
  
  const categoryInfo = getCategoryInfo(category);
  
  const getCategoryName = (cat: Category) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  return (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all animate-scale-in ${className}`}
      onClick={onClick}
    >
      <div 
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center bg-opacity-80
          ${selected ? 'ring-2 ring-purple-500 ring-offset-2 scale-105' : ''} hover:scale-110 transition-transform`}
        style={{ backgroundColor: categoryInfo.color }}
      >
        <CategoryIcon category={category} size={20} className="text-gray-700" />
      </div>
      <span className={`mt-1 md:mt-2 text-xs md:text-sm text-center truncate w-12 md:w-16 ${selected ? 'font-bold text-purple-500' : ''}`}>
        {getCategoryName(category)}
      </span>
    </div>
  );
};

export default CategoryBadge;
