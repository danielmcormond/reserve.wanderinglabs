import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Grid } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSms, faThList } from "@fortawesome/free-solid-svg-icons";
import { push } from "connected-react-router";

import Premium from "../user/premium.js";
import reserveApi from "../../utils/axios";
import DateFormat from "../utils/dateFormat";
import { Link } from "react-router-dom";

const StatusClassNames = "flex cursor-pointer text-lg font-semibold justify-center px-3 ml-6 text-gray-600 ";
const StatusActiveClassNames = "border-b-2 border-green-600 text-gray-900";

const connected = connect((store) => {
  return {
    isAuthenticated: store.session.isAuthenticated,
    user: store.user.user,
    premium: store.user.premium,
  };
});

const Requests = ({ dispatch, premium }) => {
  const [requests, setRequests] = useState([]);
  const [status, setStatus] = useState("active");
  const [{ loading, loaded }, setLoading] = useState({ loading: false, loaded: null });

  useEffect(() => {
    if (status === loaded) return;

    setLoading({ loading: true, loaded });
    reserveApi({ method: "get", url: `/availability_requests${status !== 'active' ? '/inactive' : ''}.json` }).then((response) => {
      setRequests(response.data);
      setLoading({ loading: false, loaded: status });
    });
  }, [status]);

  const mappedArs = () => {
    return requests.map((ar) => {
      return (
        <li
          key={ar.uuid}
          className="flex flex-row items-center relative border-b border-gray-300 hover:bg-gray-100 p-2 cursor-pointer"
          onClick={() => dispatch(push(`/${ar.uuid}`))}
        >
          <div className="absolute flex items-center justify-center h-full right-0 top-0 mr-2">
            {ar.notify_sms && <FontAwesomeIcon icon={faSms} className="flex text-3xl" />}

            {ar.matches_availabile_count > 0 && (
              <span className="flex items-center justify-center shadow h-8 w-8 ml-2 text-lg font-semibold rounded-full text-white bg-green-600">
                {ar.matches_availabile_count}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">{ar.facility.name}</div>
            <div className="text-lg">
              <DateFormat format="MM/DD" date={ar.date_start} />
              &nbsp;to&nbsp;
              <DateFormat format="MM/DD/YYYY" date={ar.date_end} />
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <div className="flex">
            <FontAwesomeIcon icon={faThList} className="flex text-4xl mr-4" />
            <div className="flex text-3xl font-semibold justify-center">Your Requests:</div>
          </div>

          <div className="flex border-b border-gray-300 mt-6 mb-2">
            <div className={`${StatusClassNames} ${status === "active" && StatusActiveClassNames}`}>
              <span onClick={() => setStatus("active")}>Active</span>
            </div>
            <div className={`${StatusClassNames} ${status !== "active" && StatusActiveClassNames}`}>
              <span onClick={() => setStatus("inactive")}>Expired</span>
            </div>
          </div>

          {loading && <div className="my-12 text-gray-400 text-2xl font-semibold">Loading....</div>}

          {!loading && requests.length > 0 && <ul className="flex flex-col mt-4 space-y-2 overflow-y-auto">{mappedArs()}</ul>}
          {!loading && requests.length === 0 && (
            <div className="my-12 text-gray-400 text-2xl font-semibold">No requests found</div>
          )}
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Premium />
        </Grid.Column>
      </Grid>
      <div className="flex mt-2"></div>
    </>
  );
};

export default connected(Requests);
