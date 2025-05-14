
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

  const getCategoryColor = (cat: Category): string => {
    const info = getCategoryInfo(cat);
    return `bg-[${info.color}]`;
  };

  return (
    <div 
      className={`flex flex-col items-center ${className}`}
      onClick={onClick}
    >
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center bg-opacity-80`}
        style={{ backgroundColor: categoryInfo.color }}
      >
        <CategoryIcon category={category} size={28} className="text-gray-700" />
      </div>
      <span className="mt-2 text-sm truncate max-w-full">{getCategoryName(category)}</span>
    </div>
  );
};

export default CategoryBadge;
