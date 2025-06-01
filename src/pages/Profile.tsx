
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X, ChevronRight, Moon, Sun, Info, FileUp, Trash2, DollarSign, Pencil, Search } from "lucide-react";
import { Currency } from "../types/expenses";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { currencyList, getCurrenciesByRegion, getPopularCurrencies } from "../utils/currencies";

const Profile: React.FC = () => {
  const { userProfile, updateUserProfile, clearAllData } = useAppContext();
  const [openSheet, setOpenSheet] = useState<"" | "currency" | "export" | "editName" | "about">("");
  const [name, setName] = useState(userProfile.name);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const isDark = userProfile.theme === "dark";

  const regions = [
    { id: "popular", name: "Popular" },
    { id: "americas", name: "Americas" },
    { id: "europe", name: "Europe" },
    { id: "asia", name: "Asia" },
    { id: "africa", name: "Africa" },
    { id: "oceania", name: "Oceania" }
  ];

  const getDisplayedCurrencies = (): Currency[] => {
    if (searchQuery.trim()) {
      return currencyList.filter(currency => 
        currency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        currency.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedRegion === "popular") {
      return getPopularCurrencies();
    }

    if (selectedRegion === "all") {
      return currencyList;
    }

    return getCurrenciesByRegion(selectedRegion);
  };

  const handleCurrencySelect = (currency: Currency) => {
    updateUserProfile({ currency });
    setOpenSheet("");
    toast({
      title: "Currency Updated",
      description: `Your default currency has been set to ${currency.name}`
    });
  };

  const toggleTheme = () => {
    const newTheme = userProfile.theme === "light" ? "dark" : "light";
    updateUserProfile({ theme: newTheme });
    toast({
      title: "Theme Updated", 
      description: `Switched to ${newTheme} mode`
    });
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

  const handleExport = (format: string) => {
    try {
      const expenses = localStorage.getItem("expenses") || "[]";
      const data = JSON.parse(expenses);
      
      let exportData: string;
      let mimeType: string;
      let fileExtension: string;
      
      if (format === "CSV") {
        // Convert to CSV
        const header = "id,title,amount,category,date,notes\n";
        const csvData = data.map((expense: any) => 
          `${expense.id},"${expense.title}",${expense.amount},"${expense.category}","${expense.date}","${expense.notes || ''}"`
        ).join("\n");
        exportData = header + csvData;
        mimeType = "text/csv";
        fileExtension = "csv";
      } else {
        // JSON format
        exportData = JSON.stringify(data, null, 2);
        mimeType = "application/json";
        fileExtension = "json";
      }
      
      const blob = new Blob([exportData], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `spendora-expenses.${fileExtension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported",
        description: `Your data has been exported in ${format} format.`
      });
      setOpenSheet("");
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditName = () => {
    if (name.trim() === "") {
      toast({
        title: "Invalid Name",
        description: "Please enter a valid name.",
        variant: "destructive"
      });
      return;
    }
    updateUserProfile({ name: name.trim() });
    setOpenSheet("");
    toast({
      title: "Name Updated",
      description: "Your profile name has been updated."
    });
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
          toast({
            title: "Profile Picture Updated",
            description: "Your profile picture has been updated"
          });
        }
      };
      reader.onerror = () => {
        toast({
          title: "Upload Failed",
          description: "Failed to upload image. Please try again.",
          variant: "destructive"
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`min-h-screen p-3 pb-24 ${
      isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      <div className="max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className={`p-2 rounded-full transition-colors ${
              isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"
            }`}
            aria-label="Go back"
          >
            <X size={20} className={isDark ? "text-gray-200" : "text-gray-700"} />
          </button>
          <h1 className={`text-xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>Profile</h1>
          <div className="w-8"></div>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mb-3 overflow-hidden" style={{backgroundColor: profileImage ? 'transparent' : '#A78BFA'}}>
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-semibold text-white">
                {userProfile.name.charAt(0)}
              </span>
            )}
          </div>
          <h2 className={`text-2xl font-bold ${isDark ? "text-gray-100" : "text-gray-900"}`}>{userProfile.name}</h2>
          <button 
            onClick={() => setOpenSheet("editName")}
            className="mt-3 text-purple-400 border border-purple-400 rounded-full px-5 py-2 text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Edit profile information"
          >
            Edit Profile
          </button>
        </div>

        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 ${isDark ? "text-gray-100" : "text-gray-900"}`}>Settings</h2>
          <div className={`rounded-lg divide-y ${
            isDark ? "bg-gray-800 divide-gray-700" : "bg-white divide-gray-200"
          }`}>
            <button
              onClick={() => setOpenSheet("currency")}
              className={`w-full flex items-center justify-between p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              aria-label={`Change default currency, currently set to ${userProfile.currency.name}`}
            >
              <div className="flex items-center">
                <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <DollarSign className="text-purple-500" size={18} />
                </div>
                <span className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>Default Currency</span>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {userProfile.currency.symbol} {userProfile.currency.code}
                </span>
                <ChevronRight size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
              </div>
            </button>

            <button
              onClick={toggleTheme}
              className={`w-full flex items-center justify-between p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              aria-label={`Switch to ${userProfile.theme === "light" ? "dark" : "light"} mode`}
            >
              <div className="flex items-center">
                <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  {userProfile.theme === "light" ? (
                    <Sun className="text-purple-500" size={18} />
                  ) : (
                    <Moon className="text-purple-500" size={18} />
                  )}
                </div>
                <span className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>Appearance</span>
              </div>
              <div className="flex items-center">
                <span className={`mr-2 capitalize text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  {userProfile.theme}
                </span>
                <ChevronRight size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
              </div>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 ${isDark ? "text-gray-100" : "text-gray-900"}`}>App Info</h2>
          <div className={`rounded-lg divide-y ${
            isDark ? "bg-gray-800 divide-gray-700" : "bg-white divide-gray-200"
          }`}>
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <Info className="text-purple-500" size={18} />
                </div>
                <span className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>Version</span>
              </div>
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>1.0.3 (3)</span>
            </div>

            <button 
              className={`w-full flex items-center justify-between p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              onClick={() => setOpenSheet("about")}
              aria-label="Learn more about Spendora"
            >
              <div className="flex items-center">
                <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <Info className="text-purple-500" size={18} />
                </div>
                <span className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>About Spendora</span>
              </div>
              <ChevronRight size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h2 className={`text-lg font-bold mb-3 ${isDark ? "text-gray-100" : "text-gray-900"}`}>Data Management</h2>
          <div className={`rounded-lg divide-y ${
            isDark ? "bg-gray-800 divide-gray-700" : "bg-white divide-gray-200"
          }`}>
            <button
              onClick={() => setOpenSheet("export")}
              className={`w-full flex items-center justify-between p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"
              }`}
              aria-label="Export your expense data"
            >
              <div className="flex items-center">
                <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <FileUp className="text-purple-500" size={18} />
                </div>
                <span className={`text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>Export Data</span>
              </div>
              <ChevronRight size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
            </button>

            <button
              onClick={handleClearData}
              className={`w-full flex items-center justify-between p-3 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset ${
                isDark ? "hover:bg-red-900/20" : "hover:bg-red-50"
              }`}
              aria-label="Clear all expense data - this action cannot be undone"
            >
              <div className="flex items-center">
                <div className="w-9 h-9 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                  <Trash2 className="text-red-500" size={18} />
                </div>
                <span className="text-red-500 text-sm">Clear All Data</span>
              </div>
              <ChevronRight size={16} className={isDark ? "text-gray-400" : "text-gray-500"} />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Name Sheet */}
      <Sheet open={openSheet === "editName"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[40%]">
          <SheetHeader className="mb-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-xl">Edit Profile</SheetTitle>
              <button onClick={() => setOpenSheet("")} className={isDark ? "text-gray-300" : "text-gray-500"}>
                Cancel
              </button>
            </div>
          </SheetHeader>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}>Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${isDark ? "text-gray-200" : "text-gray-900"}`}>Profile Picture</label>
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center mr-3" style={{backgroundColor: profileImage ? 'transparent' : '#A78BFA'}}>
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-xl font-semibold text-white">
                      {name.charAt(0)}
                    </span>
                  )}
                </div>
                <Button 
                  variant="outline" 
                  onClick={triggerFileInput}
                  className="text-purple-500 text-sm"
                >
                  <Pencil size={14} className="mr-2" />
                  Change Photo
                </Button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
            </div>
            <Button 
              onClick={handleEditName}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white"
            >
              Save Changes
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* About Spendora Sheet */}
      <Sheet open={openSheet === "about"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[80%]">
          <SheetHeader className="mb-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-xl">About Spendora</SheetTitle>
              <button onClick={() => setOpenSheet("")} className={isDark ? "text-gray-300" : "text-gray-500"}>
                Done
              </button>
            </div>
          </SheetHeader>
          
          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl font-semibold text-white">S</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Spendora</h2>
            <p className={`mb-2 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Version 1.0.3 (3)</p>
            
            <div className="mt-6 space-y-4 w-full text-left">
              <div>
                <h3 className={`font-bold mb-2 text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>About</h3>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Spendora is an elegant expense tracking solution designed to bring clarity to your finances. 
                  With intuitive tracking tools and beautiful visualizations, managing your money has never been more delightful.
                </p>
              </div>
              
              <div>
                <h3 className={`font-bold mb-2 text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>Features</h3>
                <ul className={`list-disc pl-5 space-y-1 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  <li>Smart expense tracking</li>
                  <li>Customizable categories</li>
                  <li>Beautiful spending visualizations</li>
                  <li>Multiple currency support</li>
                  <li>Export options for your data</li>
                  <li>Personalized themes</li>
                </ul>
              </div>
              
              <div>
                <h3 className={`font-bold mb-2 text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>Credits</h3>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Crafted with ❤️ by the Spendora team.
                </p>
              </div>
              
              <div className={`pt-4 border-t ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                <p className={`text-xs text-center ${isDark ? "text-gray-500" : "text-gray-500"}`}>
                  © 2025 Spendora. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Currency Sheet */}
      <Sheet open={openSheet === "currency"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[80%]">
          <SheetHeader className="mb-4">
            <div className="flex justify-between items-center">
              <SheetTitle className="text-xl">Select Currency</SheetTitle>
              <button onClick={() => setOpenSheet("")} className={isDark ? "text-gray-300" : "text-gray-500"}>
                Done
              </button>
            </div>
          </SheetHeader>
          <div className="mb-4 relative">
            <Search className={`absolute left-3 top-3 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={16} />
            <input
              type="text"
              placeholder="Search currencies..."
              className={`w-full p-3 pl-10 rounded-lg text-sm ${
                isDark ? "bg-gray-800 text-gray-200 placeholder-gray-400" : "bg-gray-100 text-gray-900 placeholder-gray-500"
              }`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto mb-4">
            {regions.map((region) => (
              <button 
                key={region.id}
                className={`whitespace-nowrap text-sm px-4 py-2 rounded-full ${
                  selectedRegion === region.id 
                  ? "bg-purple-500 text-white" 
                  : isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
                }`}
                onClick={() => setSelectedRegion(region.id)}
              >
                {region.name}
              </button>
            ))}
            <button 
              className={`whitespace-nowrap text-sm px-4 py-2 rounded-full ${
                selectedRegion === "all" 
                ? "bg-purple-500 text-white" 
                : isDark ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setSelectedRegion("all")}
            >
              All
            </button>
          </div>

          <div className="divide-y overflow-y-auto max-h-[calc(100%-140px)]">
            {getDisplayedCurrencies().map((currency) => (
              <button
                key={currency.code}
                className={`w-full flex items-center justify-between p-3 text-sm ${
                  userProfile.currency.code === currency.code 
                    ? isDark ? "bg-purple-900/20" : "bg-purple-50" 
                    : ""
                }`}
                onClick={() => handleCurrencySelect(currency)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center mr-3 font-bold">
                    {currency.symbol}
                  </div>
                  <div className="text-left">
                    <div className={isDark ? "text-gray-200" : "text-gray-900"}>{currency.code}</div>
                    <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{currency.name}</div>
                  </div>
                </div>
                {userProfile.currency.code === currency.code && (
                  <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={openSheet === "export"} onOpenChange={() => setOpenSheet("")}>
        <SheetContent side="bottom" className="h-[80%]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Export Data</h2>
            <button onClick={() => setOpenSheet("")} className="text-purple-500">
              Done
            </button>
          </div>

          <div className="flex flex-col items-center py-6">
            <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mb-3">
              <FileUp className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Export Your Data</h2>
            <p className={`text-center mb-6 text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
              Choose a format to export your expense data
            </p>

            <h3 className={`text-lg font-bold self-start mb-3 ${isDark ? "text-gray-200" : "text-gray-900"}`}>Export Format</h3>

            <div className={`w-full mb-3 p-3 rounded-lg flex items-center justify-between ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-lg">⋮≡</span>
                </div>
                <div>
                  <div className={`font-bold text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>CSV</div>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Spreadsheet compatible format</div>
                </div>
              </div>
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <div className={`w-full mb-4 p-3 rounded-lg flex items-center justify-between ${
              isDark ? "bg-gray-800" : "bg-gray-100"
            }`}>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-purple-600 text-lg">{ "{}" }</span>
                </div>
                <div>
                  <div className={`font-bold text-sm ${isDark ? "text-gray-200" : "text-gray-900"}`}>JSON</div>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Developer friendly format</div>
                </div>
              </div>
            </div>

            <Button 
              onClick={() => handleExport("CSV")}
              className="w-full mt-4 bg-purple-500 hover:bg-purple-600 text-white py-3"
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
