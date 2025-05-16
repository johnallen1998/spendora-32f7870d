
import React, { useEffect } from "react";
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen ${isDark ? "bg-black text-white" : "bg-gray-50"}`}>
      <div className="mx-auto max-w-md overflow-x-hidden">
        <div className="animate-fade-in">
          {children}
        </div>
        {location.pathname !== "/add-expense" && <BottomNavbar />}
      </div>
    </div>
  );
};

export default Layout;
