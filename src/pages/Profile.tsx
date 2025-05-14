
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, ChevronRight, Moon, Sun, Heart, Info, FileUp, Trash2, DollarSign } from "lucide-react";
import { Currency } from "../types/expenses";
import { toast } from "@/hooks/use-toast";

const Profile: React.FC = () => {
  const { userProfile, updateUserProfile, clearAllData } = useAppContext();
  const [openSheet, setOpenSheet] = useState<"" | "currency" | "support" | "export">("");
  const navigate = useNavigate();

  const currencies: Currency[] = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" }
  ];

  const handleCurrencySelect = (currency: Currency) => {
    updateUserProfile({ currency });
    setOpenSheet("");
  };

  const toggleTheme = () => {
    const newTheme = userProfile.theme === "light" ? "dark" : "light";
    updateUserProfile({ theme: newTheme });
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all expense data? This action cannot be undone.")) {
      clearAllData();
      toast({
        title: "Data Cleared",
        description: "All expense data has been removed."
      });
    }
  };

  const supportOptions = [
    { title: "Coffee for the Coder", description: "Help fuel development with a coffee!", price: 99 },
    { title: "Lunch for the Library", description: "Helps power new features and timely updates.", price: 499 },
    { title: "Fuel the Feature Rocket", description: "You're propelling CashLens to new heights :)", price: 999 }
  ];

  const handleSupport = (option: typeof supportOptions[0]) => {
    toast({
      title: "Thank You!",
      description: `Thank you for your support of ${option.price} ${userProfile.currency.code}!`
    });
    setOpenSheet("");
  };

  const handleExport = (format: string) => {
    toast({
      title: "Data Exported",
      description: `Your data has been exported in ${format} format.`
    });
    setOpenSheet("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-4 pb-32">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => navigate(-1)} className="p-2">
            <X size={24} />
          </button>
          <h1 className="text-2xl font-bold">Profile</h1>
          <div className="w-8"></div>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-purple-400 rounded-full flex items-center justify-center mb-4">
            <span className="text-4xl font-semibold text-white">
              {userProfile.name.charAt(0)}
            </span>
          </div>
          <h2 className="text-3xl font-bold">{userProfile.name}</h2>
          <button className="mt-4 text-purple-500 border border-purple-500 rounded-full px-6 py-2">
            Edit Profile
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Settings</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg divide-y">
            <button
              onClick={() => setOpenSheet("currency")}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <DollarSign className="text-purple-500" size={20} />
                </div>
                <span>Default Currency</span>
              </div>
              <div className="flex items-center text-gray-500">
                <span className="mr-2">{userProfile.currency.symbol} {userProfile.currency.code}</span>
                <ChevronRight size={18} />
              </div>
            </button>

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  {userProfile.theme === "light" ? (
                    <Sun className="text-purple-500" size={20} />
                  ) : (
                    <Moon className="text-purple-500" size={20} />
                  )}
                </div>
                <span>Appearance</span>
              </div>
              <div className="flex items-center text-gray-500">
                <span className="mr-2 capitalize">{userProfile.theme}</span>
                <ChevronRight size={18} />
              </div>
            </button>

            <button
              onClick={() => setOpenSheet("support")}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                  <Heart className="text-red-500" size={20} />
                </div>
                <span>Support the App</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">App Info</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg divide-y">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <Info className="text-purple-500" size={20} />
                </div>
                <span>Version</span>
              </div>
              <span className="text-gray-500">1.0.3 (3)</span>
            </div>

            <button className="w-full flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <Info className="text-purple-500" size={20} />
                </div>
                <span>About CashLens</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Data Management</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg divide-y">
            <button
              onClick={() => setOpenSheet("export")}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <FileUp className="text-purple-500" size={20} />
                </div>
                <span>Export Data</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>

            <button
              onClick={handleClearData}
              className="w-full flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                  <Trash2 className="text-red-500" size={20} />
                </div>
                <span className="text-red-500">Clear All Data</span>
              </div>
              <ChevronRight size={18} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <Sheet open={openSheet === "currency"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[80%]">
          <SheetHeader className="mb-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-2xl">Select Currency</SheetTitle>
              <button onClick={() => setOpenSheet("")} className="text-gray-500">
                Done
              </button>
            </div>
          </SheetHeader>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search currencies..."
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 rounded-lg"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto mb-4">
            <button className="bg-purple-500 text-white px-6 py-2 rounded-full">
              All
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-full">
              Americas
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-full">
              Europe
            </button>
            <button className="bg-gray-100 dark:bg-gray-800 px-6 py-2 rounded-full">
              Asia
            </button>
          </div>

          <div className="divide-y">
            {currencies.map((currency) => (
              <button
                key={currency.code}
                className={`w-full flex items-center justify-between p-4 ${
                  userProfile.currency.code === currency.code ? "bg-purple-50 dark:bg-purple-900/20" : ""
                }`}
                onClick={() => handleCurrencySelect(currency)}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center mr-4 font-bold">
                    {currency.symbol}
                  </div>
                  <div className="text-left">
                    <div>{currency.code}</div>
                    <div className="text-gray-500">{currency.name}</div>
                  </div>
                </div>
                {userProfile.currency.code === currency.code && (
                  <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet === "support"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[80%]">
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Support CashLens</h2>
            <p className="text-gray-500 text-center mb-8">
              Your support helps us continue improving CashLens and adding new features. Thank you for your generosity!
            </p>

            {supportOptions.map((option) => (
              <div key={option.title} className="w-full mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{option.title}</h3>
                  <span className="text-xl font-bold">{userProfile.currency.symbol} {option.price}</span>
                </div>
                <p className="text-gray-500 mb-2">{option.description}</p>
                <Button 
                  onClick={() => handleSupport(option)}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                >
                  Support
                </Button>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet === "export"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[80%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Export Data</h2>
            <button onClick={() => setOpenSheet("")} className="text-purple-500">
              Done
            </button>
          </div>

          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center mb-4">
              <FileUp className="text-white" size={40} />
            </div>
            <h2 className="text-3xl font-bold mb-2">Export Your Data</h2>
            <p className="text-gray-500 text-center mb-8">
              Choose a format to export your expense data
            </p>

            <h3 className="text-xl font-bold self-start mb-4">Export Format</h3>

            <div className="w-full mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-lg">⋮≡</span>
                </div>
                <div>
                  <div className="font-bold">CSV</div>
                  <div className="text-gray-500 text-sm">Spreadsheet compatible format</div>
                </div>
              </div>
              <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className="w-full mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-purple-600 text-lg">{ "{}" }</span>
                </div>
                <div>
                  <div className="font-bold">JSON</div>
                  <div className="text-gray-500 text-sm">Developer friendly format</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => handleExport("CSV")}
              className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-6"
            >
              Export Data
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Profile;
