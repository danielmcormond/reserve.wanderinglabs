import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faClipboardList, faList, faCog, faStar, faInfo, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavItem = ({ path, title, icon, yellow }) => {
  return (
    <div className="mb-8 text-center">
      <Link to={path}>
        <FontAwesomeIcon icon={icon} className={`text-3xl ${yellow && "text-yellow-500"}`} />
        <span className="font-semibold text-base block mt-1">{title}</span>
      </Link>
    </div>
  );
};

const Nav = ({ navOpen }) => {
  const isAuthenticated = useSelector((store) => store.session.isAuthenticated);

  return (
    <nav
      className={`lg:flex w-32 flex-col z-0 min-h-screen items-center bg-gray-900 py-4 text-white ${
        navOpen ? "flex" : "hidden"
      }`}
    >
      <NavItem path="/new" title="New Request" icon={faPlus} />
      {!isAuthenticated && <NavItem path="/sign-in" title="Your Account" icon={faUser} />}
      {isAuthenticated && <NavItem path="/" title="Requests" icon={faList} />}
      {isAuthenticated && <NavItem path="/settings" title="Settings" icon={faCog} />}

      <NavItem path="/premium" title="Go Premium" icon={faStar} yellow />
      <NavItem path="/about" title="About" icon={faInfo} />
      <NavItem path="/logs" title="Logs" icon={faClipboardList} />
    </nav>
  );
};

export default Nav;
