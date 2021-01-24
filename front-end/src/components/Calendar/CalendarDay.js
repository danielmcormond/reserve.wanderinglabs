import React from "react";

const defaultClasses = "float-left";
const defaultActiveClass = "bg-green-200";

const CalendarDay = ({ day, dayAvail, depart, arrive }) => {
  return (
    <div className="calendar-day">
      <div className="px-2 whitespace-no-wrap float-right">
        <span className="text-gray-600 text-xs">{(day.date() === 1 || day.day() === 0) && day.format("MMM")}</span>{" "}
        <span className="text-gray-600">{day.format("D")}</span>
      </div>

      <div className="mt-12 mb-6 text-sm font-medium clear-both">
        <div
          className={`w-1/3 ${defaultClasses} ${depart && defaultActiveClass} ${depart && !arrive && "rounded-r-full"}`}
        >
          &nbsp;
        </div>
        {dayAvail > 0 && (
          <div className={`w-2/3 ${defaultClasses} ${depart && arrive && defaultActiveClass}`}>
            <div className="rounded-l-full day-label">
              <span className="text-white text-sm font-bold pl-3">{dayAvail}</span>
            </div>
          </div>
        )}
        {dayAvail === 0 && (
          <>
            <div className={`w-1/3 ${defaultClasses} ${depart && arrive && defaultActiveClass}`}>&nbsp;</div>
            <div className={`w-1/3 ${defaultClasses} ${arrive && defaultActiveClass}`}>&nbsp;</div>
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarDay;

// departs on
// arrives on
// stay thru - circle label in middle
