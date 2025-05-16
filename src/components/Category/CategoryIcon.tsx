
import React from "react";
import { Category } from "../../types/expenses";
import { ShoppingCart, Utensils, Car, Tv } from "lucide-react";

interface CategoryIconProps {
  category: Category;
  size?: number;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, size = 24, className = "" }) => {
  const getIconByCategory = () => {
    switch (category) {
      case "groceries":
        return <ShoppingCart size={size} className={className} />;
      case "food":
        return <Utensils size={size} className={className} />;
      case "transportation":
        return <Car size={size} className={className} />;
      case "entertainment":
        return <Tv size={size} className={className} />;
      default:
        return <ShoppingCart size={size} className={className} />;
    }
  };

  return getIconByCategory();
};

export default CategoryIcon;
