import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faUserAlt } from "@fortawesome/free-solid-svg-icons";

import Nav from "./Nav";
import Imports from "../Realtime/Imports";
import RealtimeNav from "../Realtime/Nav";
import RequestEdit from "../request/edit/Index"
import SiteSelectorModal from "../request/form/SitesSelector/Modal";
import Plan from '../Plan/Index'
import Show from "../request/show/Index";

if (process.env.NODE_ENV === "production") {
  require("../../tailwind.generated.css");
} else {
  require("../../tailwind.all.css");
}

const LayoutV2 = () => {
  const [navOpen, setNavOpen] = useState(false);
  const isAuthenticated = useSelector((store) => store.session.isAuthenticated);

  return (
    <div className="sans bg-white text-gray-700 min-h-screen">
      <div className="flex items-center justify-between h-16 bg-green-500">
        <div className="flex items-center">
          <div className="flex-shrink-0 inset-x-0 z-100 items-center pl-3">
            <FontAwesomeIcon
              icon={faBars}
              className="md:hidden cursor-pointer text-xl text-white mr-2"
              onClick={() => setNavOpen(!navOpen)}
            />
            <h1 className="font-bold text-gray-100 text-xl inline">
              <Link to="/">Wandering Labs :: Reserve</Link>
            </h1>
          </div>
        </div>

        <div className="ml-4 flex items-center mr-12">
          <Link to={isAuthenticated ? "/settings" : "/sign-in"}>
            <FontAwesomeIcon icon={faUserAlt} className="text-3xl cursor-pointer text-green-200 mr-6" />
          </Link>

          <Link to="/new">
            <FontAwesomeIcon icon={faPlus} className="text-3xl cursor-pointer text-green-200 text-white" />
          </Link>
        </div>
      </div>
      <div className="container">
        <SiteSelectorModal />

        <div className="flex w-full">
          <Nav navOpen={navOpen} />

          <div className={`my-1 pt-2 pb-2 px-6 flex-1 overflow-y-auto ${navOpen && "-ml-32"}`}>
            <Route path="/logs" component={RealtimeNav} />

            <Switch>
              <Route path="/plan" component={Plan} />

              <Route path="/logs/:facilityId/:siteId" component={Imports} />
              <Route path="/logs/:facilityId" component={Imports} />
              <Route path="/logs" component={Imports} />

              <Route
                    path="/edit/:uuid([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12})"
                    component={RequestEdit}
                  />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutV2;
