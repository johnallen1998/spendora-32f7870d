
import React from "react";
import BottomNavbar from "./BottomNavbar";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { userProfile } = useAppContext();
  const isDark = userProfile.theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-gray-50"}`}>
      <div className="mx-auto max-w-md">
        {children}
        {location.pathname !== "/add-expense" && <BottomNavbar />}
      </div>
    </div>
  );
};

export default Layout;
