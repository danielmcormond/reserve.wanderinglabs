import React from "react";

const CalendarGap = ({ gapStart, gapEnd }) => {
  return (
    <div className="w-full px-2 py-3 border-r border-b relative text-sm text-gray-600">
      {gapStart.format("MMM D")} - {gapEnd.format("MMM D YYYY")} - <span className="text-red-300">Sold Out</span>
    </div>
  );
};

export default CalendarGap;
