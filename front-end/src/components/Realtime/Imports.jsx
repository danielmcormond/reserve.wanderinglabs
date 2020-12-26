import React, { useState, useEffect } from "react";
import dayjs from "dayjs"

import ImportHistory from "./ImportHistory";
import { Link } from "react-router-dom";

const baseUrl =
  process.env.NODE_ENV === "production" ? "https://api-reserve.wanderinglabs.com" : "http://localhost:3232";

const Imports = ({ match, ...props }) => {
  const facilityId = (match && match.params.facilityId) || props.facilityId
  const siteId = (match && match.params.siteId)
  const [loading, setLoading] = useState(false);
  const [imports, setImports] = useState([]);
  const [expanded, setExpanded] = useState(siteId ? true : false);

  useEffect(() => {
    getImports();
  }, [expanded, facilityId, siteId]);

  const getImports = () => {
    setLoading(true);

    const obj = { facility_id: facilityId, site_id: siteId && siteId, expanded };
    Object.keys(obj).forEach((key) => (obj[key] === undefined ? delete obj[key] : {}));
    const params = new URLSearchParams(obj).toString();

    fetch(`${baseUrl}/availability_imports.json?${params}`)
      .then((response) => response.json())
      .then((data) => {
        setImports(data);
        setLoading(false);
      });
  };

  const allImports = () => {
    return imports.map((i, x) => {
      return (
        <React.Fragment key={i.id}>
          <tr className={expanded || x % 2 === 0 ? "bg-gray-100" : undefined}>
            <td className="border px-4 py-2 text-xl">
              <Link to={`/logs/${i.facility.id}`}>{i.facility.name}</Link>
            </td>
            <td className="border px-4 py-2 text-xl"> {dayjs(i.created_at).format("YYYY/MM/DD HH:mm")}</td>
            <td className="border px-4 py-2 text-xl">{i.history_open_count}</td>
            <td className="border px-4 py-2 text-xl">{i.history_filled_count}</td>
          </tr>
          {i.history_open && i.history_open.length > 0 && (
            <ImportHistory history={i.history_open} facilityId={facilityId} type="open" />
          )}
          {i.history_filled && i.history_filled.length > 0 && (
            <ImportHistory history={i.history_filled} facilityId={facilityId} type="filled" />
          )}
        </React.Fragment>
      );
    });
  };

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <>
      <h1 className="text-4xl font-semibold">Availability Imports</h1>
      <span className="text-xl">Changelog of site availabilities as seen by this app. Scrape attempts that do not observe any availability differences are not recorded.</span>

      {facilityId && imports[0] && (
        <div className="mt-6">
          <span className="text-xl font-bold mr-3"><span className="text-gray-800 pr-1">Facility:</span> {imports[0].facility.name}</span>
          <Link to="/logs">
            <span className="text-xs text-gray-600">(clear)</span>
          </Link>
        </div>
      )}

      {siteId && (
        <div className="mt-2">
          <span className="text-xl font-bold mr-3"><span className="text-gray-800 pr-1">Site Filtered</span></span>
          <Link to={`/logs/${facilityId}`}>
            <span className="text-xs text-gray-600">(clear)</span>
          </Link>
        </div>
      )}

      <table className={`mt-6 min-w-full bg-white table-fixed ${loading && "opacity-25"}`}>
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-7/12 text-left py-3 px-4 uppercase font-semibold text-sm">
              Facility
              <button className="float-right text-xs font-semibold text-gray-300" onClick={toggleExpand}>
                [ Toggle Site and Date Details ]
              </button>
            </th>
            <th className="w-3/12 text-left py-3 px-4 uppercase font-semibold text-sm">Date</th>
            <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Open</th>
            <th className="w-1/12 text-left py-3 px-4 uppercase font-semibold text-sm">Filled</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">{allImports()}</tbody>
      </table>
    </>
  );
};

export default Imports;
