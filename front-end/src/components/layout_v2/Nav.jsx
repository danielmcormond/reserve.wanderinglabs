import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const navItem = "mb-6 text-center";

const Nav = ({ navOpen }) => {
  return (
    <nav
      className={`md:flex w-32 flex-col z-0 min-h-screen items-center bg-gray-900 py-4 text-white ${navOpen ? "flex" : "hidden"}`}
    >



      <div className={navItem}>
        <Link to="/new">
          <FontAwesomeIcon icon={faPlus} className="text-3xl font-bold" />
        </Link>
        <Link to="/new" className="font-bold text-sm block">
          New Request
        </Link>
      </div>

      <div className={navItem}>
        <Link to="/logs">
          <FontAwesomeIcon icon={faClipboardList} className="text-3xl font-bold" />
        </Link>
        <Link to="/logs" className="font-bold text-sm block">
          Logs
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
