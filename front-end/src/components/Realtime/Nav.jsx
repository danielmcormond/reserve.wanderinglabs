import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const liClasses = "mr-8 text-gray-700 hover:text-green-800 text-xl font-bold px-6 pb-1 -mb-2px";
const activeLiClasses = "border-b-2 border-green-600";

const RealtimeNav = (props) => {
  // const isAuthenticated = useSelector(store => store.session.isAuthenticated)

  const navItems = [
    { path: "/logs", title: "Logs" },
    { path: "/facilities", title: "Facilities" },
    { path: "/calendar", title: "Calendar" },
  ];

  const navList = () => {
    return navItems.map((item) => {
      return (
        <li
          key={item.path}
          className={`${liClasses} ${props.location.pathname.includes(item.path) && activeLiClasses}`}
        >
          <Link to={item.path}>{item.title}</Link>
        </li>
      );
    });
  };

  return <ul className="flex mt-6 mb-6 border-b-2 border-gray-400 px-4">{navList()}</ul>;
};

export default RealtimeNav;