
import React from "react";
import { Category } from "../../types/expenses";
import CategoryIcon from "./CategoryIcon";
import { useAppContext } from "../../context/AppContext";
import { useIsMobile } from "../../hooks/use-mobile";

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
  const { getCategoryInfo, userProfile } = useAppContext();
  const isMobile = useIsMobile();
  const isDark = userProfile.theme === "dark";
  const categoryInfo = getCategoryInfo(category);
  
  const getCategoryName = (cat: Category) => {
    if (typeof cat !== 'string') return '';
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  const iconSize = isMobile ? 18 : 22;
  const badgeSize = isMobile ? "w-11 h-11" : "w-14 h-14";

  return (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all animate-scale-in ${className}`}
      onClick={onClick}
    >
      <div 
        className={`${badgeSize} rounded-full flex items-center justify-center bg-opacity-20
          ${selected ? (isDark ? 'ring-2 ring-purple-400 scale-105' : 'ring-2 ring-purple-500 scale-105') : ''} hover:scale-110 transition-transform`}
        style={{ backgroundColor: categoryInfo?.color || "#F2FCE2" }}
      >
        <CategoryIcon 
          category={category} 
          size={iconSize} 
          className={`${selected 
            ? (isDark ? 'text-purple-400' : 'text-purple-500') 
            : (isDark ? 'text-white' : 'text-gray-700')
          }`} 
        />
      </div>
      <span className={`mt-1 text-xs text-center truncate w-14 ${
        selected 
          ? (isDark ? 'font-bold text-purple-400' : 'font-bold text-purple-500')
          : (isDark ? 'text-gray-300' : 'text-gray-700')
      }`}>
        {getCategoryName(category)}
      </span>
    </div>
  );
};

export default CategoryBadge;
