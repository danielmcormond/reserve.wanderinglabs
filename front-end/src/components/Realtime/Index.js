import React, { useState } from "react";
import { Route, Switch } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "../../tailwind.generated.css";

import Nav from "./Nav";

const Realtime = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="tailwind">
    <div className="antialiased sans-serif bg-gray-200 text-gray-900 min-h-screen">
      <header className="flex bg-green-500 inset-x-0 z-100 h-12 items-center pl-3">
        <FontAwesomeIcon
          icon={faBars}
          className="md:hidden cursor-pointer text-xl font-bold text-white mr-2"
          onClick={() => setNavOpen(!navOpen)}
        />
        <h1 className="font-bold text-gray-100 text-xl">Wandering Labs :: Reserve</h1>
      </header>
      <div className="container">
        <div className="flex w-full">
          <Nav navOpen={navOpen} />

          <div className={`my-1 pt-2 pb-2 px-6 flex-1 overflow-y-auto ${navOpen && "-ml-32"}`}>HW</div>
        </div>
      </div>
    </div></div>
  );
};

export default Realtime;
