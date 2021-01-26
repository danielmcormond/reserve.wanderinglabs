import reserveApi from "../utils/axios";
import store from "../store";
import camelcaseKeys from 'camelcase-keys'

export function calendarFacilityFetch(facilityId, color) {
  return function(dispatch) {
    const availabilityRequest = store.getState().availabilityRequestForm

    const apiValues = {
      facility_id: facilityId,
      date_start: availabilityRequest.dateStart,
      date_end: availabilityRequest.dateEnd,
      stay_length: availabilityRequest.stayLength,
      email: availabilityRequest.email,
      sewer: availabilityRequest.sewer,
      water: availabilityRequest.water,
      pullthru: availabilityRequest.pullthru,
      min_length: availabilityRequest.length,
      min_electric: availabilityRequest.electric,
      site_premium: availabilityRequest.sitePremium,
      ignore_ada: availabilityRequest.ignoreAda,
      site_type: availabilityRequest.type,
      specific_site_ids: availabilityRequest.specificSiteIds,
      arrival_days: availabilityRequest.arrivalDays
    };

    reserveApi({
      method: "post",
      url: `/facilities/${facilityId}/availabilities/calendar.json`,
      data: {
        availability_request: apiValues
      }
    })
      .then(response => {
        dispatch({
          type: "CALENDAR_FACILITY_FULFILLED",
          payload: {...response.data, color }
        });
      })
      .catch(err => {
        dispatch({ type: "CALENDAR_FACILITY_REJECTED", payload: err });
      });
  };
}
