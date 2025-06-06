
export type Category = "groceries" | "food" | "transportation" | "entertainment" | string;

export type CategoryInfo = {
  id: string;
  name: string;
  color: string;
  icon: string;
  isCustom?: boolean;
};

export type Expense = {
  id: string;
  title: string;
  amount: number;
  category: Category;
  date: Date;
  notes?: string;
};

export type TimeFrame = "today" | "this-week" | "this-month" | "this-year";

export type Currency = {
  code: string;
  symbol: string;
  name: string;
};

export type AppTheme = "light" | "dark";

export type UserProfile = {
  name: string;
  currency: Currency;
  theme: AppTheme;
};
