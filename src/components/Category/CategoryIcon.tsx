
import React from "react";
import { Category } from "../../types/expenses";
import { 
  ShoppingCart, 
  Utensils, 
  Car, 
  Gamepad2, 
  Plane, 
  Bus, 
  Home, 
  Coffee, 
  Gift, 
  Briefcase 
} from "lucide-react";

interface CategoryIconProps {
  category: Category;
  size?: number;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, size = 24, className = "" }) => {
  const getIconByCategory = () => {
    // Ensure we're working with lowercase category names for consistency
    const categoryName = typeof category === 'string' ? category.toLowerCase() : '';
    
    switch (categoryName) {
      case "groceries":
        return <ShoppingCart size={size} className={className} />;
      case "food":
        return <Utensils size={size} className={className} />;
      case "transportation":
        return <Car size={size} className={className} />;
      case "entertainment":
        return <Gamepad2 size={size} className={className} />;
      case "travel":
        return <Plane size={size} className={className} />;
      case "transit":
        return <Bus size={size} className={className} />;
      case "home":
        return <Home size={size} className={className} />;
      case "coffee":
        return <Coffee size={size} className={className} />;
      case "gifts":
        return <Gift size={size} className={className} />;
      case "work":
        return <Briefcase size={size} className={className} />;
      default:
        // For any unknown category, default to ShoppingCart
        return <ShoppingCart size={size} className={className} />;
    }
  };

  return getIconByCategory();
};

export default CategoryIcon;
