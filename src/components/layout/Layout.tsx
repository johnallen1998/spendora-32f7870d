
import React, { useEffect } from "react";
import BottomNavbar from "./BottomNavbar";
import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useIsMobile } from "../../hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { userProfile } = useAppContext();
  const isDark = userProfile.theme === "dark";
  const isMobile = useIsMobile();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
    }`}>
      <div className={`mx-auto ${isMobile ? "max-w-md" : "max-w-xl"} overflow-x-hidden`}>
        <div className="animate-fade-in">
          {children}
        </div>
        {location.pathname !== "/add-expense" && <BottomNavbar />}
      </div>
    </div>
  );
};

export default Layout;
