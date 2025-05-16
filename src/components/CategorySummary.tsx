
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
            className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mr-2 md:mr-3 animate-scale-in"
            style={{ backgroundColor: categoryInfo.color }}
          >
            <CategoryIcon category={category} size={16} />
          </div>
          <span className="capitalize font-medium truncate max-w-[80px] md:max-w-[100px] text-sm md:text-base">{category}</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-sm md:text-lg">{currency.symbol}{total.toFixed(2)}</span>
          <span className="text-gray-500 ml-2 text-xs md:text-sm">{percentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-gray-200">
        <div
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: categoryInfo.color
          }}
        ></div>
      </div>
    </div>
  );
};

export default CategorySummary;
