import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import reserveApi from "../utils/axios";
import { fetchAvailabilityRequest } from "./availabilityRequestsActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockHttp = new MockAdapter(reserveApi);

describe("fetchAvailabilityRequest action", () => {
  let store = mockStore({});
  const uuid = "fb0c53a9-44c6-46e2-bde3-d8d04deea040";

  let response = {
    uuid: "fb0c53a9-44c6-46e2-bde3-d8d04deea040",
    user_id: 7,
    facility_id: 3526,
    date_start: "2018-01-01",
    date_end: "2020-01-10",
    stay_length: 1,
    matches_availabile_count: 155,
    status: "active",
    checked_count: 2,
    checked_at: "2017-12-07T01:08:04.743Z",
    premium: true,
    summary: "RV Sites",
    site_count: 52,
    notify_sms: true,
    facility: {
      id: 3526,
      name: "Grayton Beach State Park",
      agency_id: 8,
      type: "Facility::ReserveAmerica",
      sub_name: "Florida Department of Environmental Protection, FL",
      sites_details: null
    }
  };

  beforeEach(() => {
    store.clearActions();
    mockHttp.onGet(`/availability_requests/${uuid}.json`).reply(200, response);
  });

  it('dipatches the "inprogress" action', () => {
    return store.dispatch(fetchAvailabilityRequest(uuid)).then(() => {
      expect(store.getActions()).toContainEqual({ type: "FETCH_AR" });
    });
  });

  it("calls the api for a list of requests", () => {
    return store.dispatch(fetchAvailabilityRequest(uuid)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: "FETCH_AR_FULFILLED",
        payload: response
      });
    });
  });

  it("Sets the user as premium", () => {
    return store.dispatch(fetchAvailabilityRequest(uuid)).then(() => {
      expect(store.getActions()).toContainEqual({ type: "SET_PREMIUM" });
    });
  });

  it("Does not set the user as premium", () => {
    response.premium = false;
    return store.dispatch(fetchAvailabilityRequest(uuid)).then(() => {
      expect(store.getActions()).not.toContainEqual({ type: "SET_PREMIUM" });
    });
  });

  // TODO - figure how to mock store.getState()
  // it("gets the request from current state of requests", () => {
  //   let store = mockStore({
  //     availabilityRequests: {
  //       ars: [{ uuid }]
  //     }
  //   });

  //   mockHttp.reset();
  //   mockHttp.onAny().reply(500); // Shouldn't get called
  //   return store.dispatch(fetchAvailabilityRequest(uuid)).then(() => {
  //     expect(store.getActions()).toContainEqual({
  //       type: "FETCH_AR_FULFILLED",
  //       payload: response
  //     });
  //   });
  // });
});
