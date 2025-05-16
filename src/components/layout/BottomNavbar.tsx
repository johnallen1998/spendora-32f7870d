
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart3, Plus } from "lucide-react";
import { useAppContext } from "../../context/AppContext";

const BottomNavbar = () => {
  const location = useLocation();
  const { userProfile } = useAppContext();
  const isDark = userProfile.theme === "dark";

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
      <div className={`flex justify-around items-center p-4 ${isDark ? "bg-black" : "bg-white"} border-t`}>
        <Link
          to="/"
          className={`flex flex-col items-center ${
            location.pathname === "/" ? "text-purple-500" : isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          to="/add-expense"
          className="flex flex-col items-center -mt-8"
        >
          <div className="rounded-full bg-purple-500 p-4 shadow-lg">
            <Plus size={24} color="white" />
          </div>
        </Link>
        <Link
          to="/statistics"
          className={`flex flex-col items-center ${
            location.pathname === "/statistics" ? "text-purple-500" : isDark ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-xs mt-1">Statistics</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavbar;
