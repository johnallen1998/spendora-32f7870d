
import React from "react";
import { Category } from "../types/expenses";
import CategoryIcon from "./Category/CategoryIcon";
import { useAppContext } from "../context/AppContext";

interface CategorySummaryProps {
  category: Category;
  total: number;
  percentage: number;
  index?: number;
}

const CategorySummary: React.FC<CategorySummaryProps> = ({
  category,
  total,
  percentage,
  index = 0
}) => {
  const { userProfile, getCategoryInfo } = useAppContext();
  const { currency } = userProfile;
  const categoryInfo = getCategoryInfo(category);
  
  // Animation delay based on index
  const delayClass = `stagger-delay-${(index % 4) + 1}`;

  return (
    <div className={`mb-4 animate-fade-in ${delayClass}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center mr-2 animate-scale-in"
            style={{ backgroundColor: categoryInfo?.color ? `${categoryInfo.color}30` : "#F2FCE230" }}
          >
            <CategoryIcon category={category} size={16} className="text-gray-700 dark:text-gray-200" />
          </div>
          <span className="capitalize font-medium truncate max-w-[80px] text-sm">
            {typeof category === 'string' ? category : ''}
          </span>
        </div>
        <div className="text-right">
          <span className="font-bold text-sm">{currency.symbol}{total.toFixed(2)}</span>
          <span className="text-gray-500 ml-2 text-xs">{percentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: categoryInfo?.color || "#F2FCE2"
          }}
        ></div>
      </div>
    </div>
  );
};

export default CategorySummary;
