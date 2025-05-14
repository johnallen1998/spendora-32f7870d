
import React from "react";
import { TimeFrame } from "../types/expenses";
import { useAppContext } from "../context/AppContext";

const TimeFrameSelector: React.FC = () => {
  const { selectedTimeFrame, setSelectedTimeFrame } = useAppContext();

  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "this-week", label: "This Week" },
    { value: "this-month", label: "This Month" },
    { value: "this-year", label: "This Year" }
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto py-2">
      {timeFrames.map((frame) => (
        <button
          key={frame.value}
          onClick={() => setSelectedTimeFrame(frame.value)}
          className={`px-6 py-3 rounded-full whitespace-nowrap ${
            selectedTimeFrame === frame.value
              ? "bg-purple-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {frame.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;
