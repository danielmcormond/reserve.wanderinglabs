import _ from "lodash";
import axios from "axios";

import store from "../store";

export function fetchSites(facilityId, value, ids) {
  return function(dispatch) {
    dispatch({ type: "FETCH_SITES" });
    axios
      .get(`http://wl.dev/facilities/${facilityId}/sites.json?q=${value}`)
      .then(response => {
        // This is required as currently selected must be in <Dropdown options>
        let selectedSites = _.filter(store.getState().sites.sites, site => {
          return _.includes(ids, site.key);
        });

        const mappedData = response.data.map(site => {
          return {
            key: site.id,
            text: site.site_num,
            value: site.id
          };
        });

        dispatch({
          type: "FETCH_SITES_FULFILLED",
          payload: _.uniq(mappedData.concat(selectedSites))
        });
      })
      .catch(err => {
        dispatch({ type: "FETCH_SITES_REJECTED", payload: err });
      });
  };
}
