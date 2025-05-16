
import React from "react";
import { TimeFrame } from "../types/expenses";
import { useAppContext } from "../context/AppContext";
import { Card } from "./ui/card";
import { useIsMobile } from "../hooks/use-mobile";

const TimeFrameSelector: React.FC = () => {
  const { selectedTimeFrame, setSelectedTimeFrame } = useAppContext();
  const isMobile = useIsMobile();

  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
    { value: "this-year", label: "This Year" }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 animate-slide-in">
      {timeFrames.map((frame, index) => (
        <button
          key={frame.value}
          onClick={() => setSelectedTimeFrame(frame.value)}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all duration-200 stagger-delay-${index + 1} animate-fade-in
            ${selectedTimeFrame === frame.value
              ? "bg-purple-500 text-white scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
        >
          {frame.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;
