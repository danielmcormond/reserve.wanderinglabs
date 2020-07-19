import React, { useMemo } from "react";
import { Link } from "react-router-dom";

const ImportHistory = ({ facilityId, history, type = "open" }) => {
  const bgColor = useMemo(() => {
    return type === "open" ? { id: 'bg-green-300', date: 'bg-green-200' } : { id: 'bg-red-300', date: 'bg-red-200' };
  }, [type]);

  const histories = () => {
    return history.map((h, x) => {
      return (
        <div key={`${x}${h.site_id}${h.avail_date}`} className="text-xs mr-2 mt-1 flex flex-shrink-0">
          <div className={`${bgColor.id} text-gray-600 px-2 py-1 rounded-l-md`}><Link to={`/logs/${facilityId}/${h.id}`}>{h.site_id}</Link></div>
          <div className={`${bgColor.date} text-gray-600 px-2 py-1 rounded-r-md`}>{h.avail_date}</div>
        </div>
      );
    });
  };

  return (
    <tr>
      <td className="border px-4 py-2 font-semibold" colSpan="4">
        <div className="flex flex-wrap flex-shrink-0">{histories()}</div>
      </td>
    </tr>
  );
};

export default ImportHistory;
