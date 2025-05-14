
import React from "react";
import { Category } from "../types/expenses";
import CategoryIcon from "./Category/CategoryIcon";
import { useAppContext } from "../context/AppContext";

interface CategorySummaryProps {
  category: Category;
  total: number;
  percentage: number;
}

const CategorySummary: React.FC<CategorySummaryProps> = ({
  category,
  total,
  percentage,
}) => {
  const { userProfile } = useAppContext();
  const { currency } = userProfile;

  const getCategoryColor = (cat: Category): string => {
    switch (cat) {
      case "groceries":
        return "bg-categoryBg-groceries";
      case "food":
        return "bg-categoryBg-food";
      case "transportation":
        return "bg-categoryBg-transportation";
      case "entertainment":
        return "bg-categoryBg-entertainment";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(
              category
            )}`}
          >
            <CategoryIcon category={category} size={20} />
          </div>
          <span className="capitalize font-medium">{category}</span>
        </div>
        <div className="text-right">
          <span className="font-bold text-lg">{currency.symbol}{total.toFixed(2)}</span>
          <span className="text-gray-500 ml-2">{percentage.toFixed(1)}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-gray-200">
        <div
          className={`h-2 rounded-full ${getCategoryColor(category)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CategorySummary;
