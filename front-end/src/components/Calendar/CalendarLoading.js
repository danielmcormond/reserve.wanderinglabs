import React from "react";
const CalendarLoading = ({ facility }) => {
  return (
    <div className="w-full min-h-screen text-center mt-40">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="72" height="72" className="display-block m-auto mb-6">
        <path
          d="M17 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h2V3a1 1 0 1 1 2 0v1h6V3a1 1 0 0 1 2 0v1zm-2 2H9v1a1 1 0 1 1-2 0V6H5v4h14V6h-2v1a1 1 0 0 1-2 0V6zm4 6H5v8h14v-8z"
        />
      </svg>
      <span className="text-center text-gray-600 text-xl">
      Loading</span>
    </div>
  );
};

export default CalendarLoading;
