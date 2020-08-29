import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSms } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SmsOverLimit = () => {
  // const isAuthenticated = useSelector((store) => store.session.isAuthenticated);

  return(
    <Link
    to="/settings"
    className="flex flex-row items-center bg-red-100 p-5 rounded border-t-2 border-red-800"
  >
    <FontAwesomeIcon icon={faSms} className="flex text-5xl" />
    <div className="ml-4">
      <div className="font-semibold text-lg text-red-800">SMS Limits Reached!</div>
      <div className="pt-2 text-sm text-red-800">
        SMS alerting on your account is currently disabled.

      </div>

      <div className="pt-2 text-sm text-red-800">
        Any payment amount will automatically add 250 more SMS alerts to your account. (Or reach out to info@wanderinglabs.com)
      </div>
    </div>
  </Link>
  )
}

export default SmsOverLimit
