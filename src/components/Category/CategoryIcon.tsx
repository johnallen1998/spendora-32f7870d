
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
import { useAppContext } from "../../context/AppContext";

interface CategoryIconProps {
  category: Category;
  size?: number;
  className?: string;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ category, size = 24, className = "" }) => {
  const { userProfile } = useAppContext();
  const isDark = userProfile.theme === "dark";
  
  // Only use theme-aware default color if no className is provided
  const iconColor = className || (isDark ? "text-gray-200" : "text-gray-700");
  
  const getIconByCategory = () => {
    // Ensure we're working with lowercase category names for consistency
    const categoryName = typeof category === 'string' ? category.toLowerCase() : '';
    
    switch (categoryName) {
      case "groceries":
        return <ShoppingCart size={size} className={iconColor} />;
      case "food":
        return <Utensils size={size} className={iconColor} />;
      case "transportation":
        return <Car size={size} className={iconColor} />;
      case "entertainment":
        return <Gamepad2 size={size} className={iconColor} />;
      case "travel":
        return <Plane size={size} className={iconColor} />;
      case "transit":
        return <Bus size={size} className={iconColor} />;
      case "home":
        return <Home size={size} className={iconColor} />;
      case "coffee":
        return <Coffee size={size} className={iconColor} />;
      case "gifts":
        return <Gift size={size} className={iconColor} />;
      case "work":
        return <Briefcase size={size} className={iconColor} />;
      default:
        // For any unknown category, default to ShoppingCart
        return <ShoppingCart size={size} className={iconColor} />;
    }
  };

  return getIconByCategory();
};

export default CategoryIcon;
