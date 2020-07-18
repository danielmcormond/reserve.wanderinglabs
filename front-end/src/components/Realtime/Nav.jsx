import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";

const navItem = "mb-6 text-center";

const Nav = ({ navOpen }) => {
  return (
    <nav
      className={`md:flex w-32 flex-col z-0 min-h-screen items-center bg-gray-900 py-4 text-white ${navOpen ? "flex" : "hidden"}`}
    >



      <div className={navItem}>
        <a href="https://reserve.wanderinglabs.com/new">
          <FontAwesomeIcon icon={faPlus} className="text-3xl font-bold" />
        </a>
        <a href="https://reserve.wanderinglabs.com/new" className="font-bold text-sm block">
          New Request
        </a>
      </div>

      <div className={navItem}>
        <a to="/logs">
          <FontAwesomeIcon icon={faClipboardList} className="text-3xl font-bold" />
        </a>
        <a to="/logs" className="font-bold text-sm block">
          Logs
        </a>
      </div>
    </nav>
  );
};

export default Nav;
