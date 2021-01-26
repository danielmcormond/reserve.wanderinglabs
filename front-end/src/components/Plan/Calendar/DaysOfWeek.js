import React from "react";
import dayjs from "dayjs";

const DaysOfWeek = () => {
  const daysOfWeek = () => {
    return dayjs.weekdays().map((day) => {
      return (
        <div key={day} className="calendar-day px-2 py-3 text-gray-700 tracking-wide bg-gray-100 text-sm font-bold">
          <span className="hidden lg:inline">{day}</span>
          <span className="hidden md:inline lg:hidden">{day.substring(0,3)}</span>
          <span className="md:hidden">{day.substring(0,1)}</span>

        </div>
      );
    });
  };
  return <>{daysOfWeek()}</>;
};

export default DaysOfWeek;
