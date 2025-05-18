import React, { createContext, useContext, useState, useEffect } from "react";
import { Expense, TimeFrame, Category, UserProfile, Currency, AppTheme, CategoryInfo } from "../types/expenses";
import { toast } from "@/components/ui/sonner";

type SortOption = "date-desc" | "date-asc" | "amount-desc" | "amount-asc" | "title";

type AppContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  clearAllData: () => void;
  selectedTimeFrame: TimeFrame;
  setSelectedTimeFrame: (timeFrame: TimeFrame) => void;
  filterByCategory: (category: Category | null) => void;
  selectedCategory: Category | null;
  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  getFilteredExpenses: () => Expense[];
  getCategoryTotal: (category: Category) => number;
  getTotalExpenses: () => number;
  categories: CategoryInfo[];
  addCategory: (category: Omit<CategoryInfo, "id">) => void;
  deleteCategory: (id: string) => void;
  getCategoryInfo: (categoryName: Category) => CategoryInfo;
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchExpenses: (query: string) => Expense[];
  clearFilters: () => void;
  budgetLimits: Record<string, number>;
  setBudgetLimit: (categoryId: string, amount: number) => void;
  getBudgetLimit: (categoryId: string) => number;
};

const defaultCurrency: Currency = {
  code: "INR",
  symbol: "₹",
  name: "Indian Rupee"
};

const defaultUserProfile: UserProfile = {
  name: "Vineet",
  currency: defaultCurrency,
  theme: "light"
};

const defaultCategories: CategoryInfo[] = [
  {
    id: "groceries",
    name: "groceries",
    color: "#F2FCE2", // Soft Green
    icon: "shopping-cart"
  },
  {
    id: "food",
    name: "food",
    color: "#FEF7CD", // Soft Yellow
    icon: "utensils"
  },
  {
    id: "transportation",
    name: "transportation",
    color: "#FDE1D3", // Soft Peach
    icon: "car"
  },
  {
    id: "entertainment",
    name: "entertainment",
    color: "#E5DEFF", // Soft Purple
    icon: "tv"
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      return JSON.parse(savedExpenses).map((expense: any) => ({
        ...expense,
        date: new Date(expense.date)
      }));
    }
    return [
      {
        id: "1",
        title: "Chocolate",
        amount: 20,
        category: "food",
        date: new Date(2025, 4, 7)
      },
      {
        id: "2",
        title: "Dinner",
        amount: 120,
        category: "food",
        date: new Date(2025, 4, 7)
      }
    ];
  });

  const [categories, setCategories] = useState<CategoryInfo[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) {
      return JSON.parse(savedCategories);
    }
    return defaultCategories;
  });

  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>("today");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem("userProfile");
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return defaultUserProfile;
  });

  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [budgetLimits, setBudgetLimits] = useState<Record<string, number>>(() => {
    const savedLimits = localStorage.getItem("budgetLimits");
    return savedLimits ? JSON.parse(savedLimits) : {};
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    document.documentElement.className = userProfile.theme;
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem("budgetLimits", JSON.stringify(budgetLimits));
  }, [budgetLimits]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString()
    };
    setExpenses(prev => [...prev, newExpense]);
    toast.success("Expense added successfully!");
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  };

  const clearAllData = () => {
    setExpenses([]);
    toast.success("All expenses cleared!");
  };

  const filterByCategory = (category: Category | null) => {
    setSelectedCategory(category);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
    toast.success("Profile updated!");
  };

  const getFilteredExpenses = () => {
    let filtered = [...expenses];
    
    // Filter by time frame
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const yearStart = new Date(today.getFullYear(), 0, 1);
    
    switch (selectedTimeFrame) {
      case "today":
        filtered = filtered.filter(expense => {
          const expDate = new Date(expense.date);
          return expDate >= today;
        });
        break;
      case "this-week":
        filtered = filtered.filter(expense => {
          const expDate = new Date(expense.date);
          return expDate >= weekStart;
        });
        break;
      case "this-month":
        filtered = filtered.filter(expense => {
          const expDate = new Date(expense.date);
          return expDate >= monthStart;
        });
        break;
      case "this-year":
        filtered = filtered.filter(expense => {
          const expDate = new Date(expense.date);
          return expDate >= yearStart;
        });
        break;
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(expense => expense.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.title.toLowerCase().includes(query) || 
        expense.category.toLowerCase().includes(query)
      );
    }
    
    // Sort results
    switch (sortOption) {
      case "date-desc":
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case "date-asc":
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case "amount-desc":
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case "amount-asc":
        filtered.sort((a, b) => a.amount - b.amount);
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
    
    return filtered;
  };

  const getTotalExpenses = () => {
    return getFilteredExpenses().reduce((total, expense) => total + expense.amount, 0);
  };

  const getCategoryTotal = (category: Category) => {
    return getFilteredExpenses()
      .filter(expense => expense.category === category)
      .reduce((total, expense) => total + expense.amount, 0);
  };

  const addCategory = (category: Omit<CategoryInfo, "id">) => {
    const newCategory = {
      ...category,
      id: Date.now().toString(),
      isCustom: true
    };
    setCategories(prev => [...prev, newCategory]);
    toast.success(`Category ${category.name} added!`);
  };

  const deleteCategory = (id: string) => {
    // Don't allow deletion of default categories
    if (defaultCategories.some(cat => cat.id === id)) {
      toast.error("Cannot delete default category");
      return;
    }
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast.success("Category deleted");
  };

  const getCategoryInfo = (categoryName: Category): CategoryInfo => {
    const category = categories.find(cat => cat.name === categoryName);
    return category || categories[0]; // Return first category as fallback
  };

  const searchExpenses = (query: string): Expense[] => {
    setSearchQuery(query);
    return getFilteredExpenses();
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setSelectedTimeFrame("today");
    setSortOption("date-desc");
    toast.info("All filters cleared");
  };

  const setBudgetLimit = (categoryId: string, amount: number) => {
    setBudgetLimits(prev => ({
      ...prev,
      [categoryId]: amount
    }));
  };

  const getBudgetLimit = (categoryId: string): number => {
    return budgetLimits[categoryId] || 0;
  };

  const value = {
    expenses,
    addExpense,
    deleteExpense,
    clearAllData,
    selectedTimeFrame,
    setSelectedTimeFrame,
    filterByCategory,
    selectedCategory,
    userProfile,
    updateUserProfile,
    getFilteredExpenses,
    getCategoryTotal,
    getTotalExpenses,
    categories,
    addCategory,
    deleteCategory,
    getCategoryInfo,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
    searchExpenses,
    clearFilters,
    budgetLimits,
    setBudgetLimit,
    getBudgetLimit
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
