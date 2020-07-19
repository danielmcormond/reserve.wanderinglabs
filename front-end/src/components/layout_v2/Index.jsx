import React, { useState } from "react";
import { Route, Switch } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "../../tailwind.generated.css";

import Nav from "./Nav";
import Imports from "../Realtime/Imports";
import RealtimeNav from "../Realtime/Nav";

const LayoutV2 = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <div className="antialiased sans-serif bg-white text-gray-900 min-h-screen">
      <header className="flex bg-green-500 inset-x-0 z-100 h-16 items-center pl-3">
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

          <div className={`my-1 pt-2 pb-2 px-6 flex-1 overflow-y-auto ${navOpen && "-ml-32"}`}>
          <Route path="/logs" component={RealtimeNav} />

            <Switch>
              <Route path="/logs/:facilityId/:siteId" component={Imports} />
              <Route path="/logs/:facilityId" component={Imports} />
              <Route path="/logs" component={Imports} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutV2;
