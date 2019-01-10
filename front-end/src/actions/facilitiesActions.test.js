import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import reserveApi from "../utils/axios";
import MockAdapter from "axios-mock-adapter";

import {
  fetchFacilities,
  groupedAvailabilitiesSort
} from "./facilitiesActions";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockHttp = new MockAdapter(reserveApi);

describe("groupedAvailabilitiesSort action", () => {
  it("expected actions should be dispatched with arg value", () => {
    const store = mockStore({});
    store.dispatch(groupedAvailabilitiesSort("b"));
    const actions = store.getActions();
    const expectedPayload = { type: "GROUP_AVAILS_SORT", payload: "b" };
    expect(actions).toEqual([expectedPayload]);
  });
});

describe("fetchFacilities action", () => {
  const response = [
    {
      id: 3509,
      name: "Bahia Honda State Park",
      agency_id: 8,
      type: "Facility::ReserveAmerica",
      sub_name: "Florida Department of Environmental Protection, FL",
      sites_details: null
    }
  ];

  it("dispatches fullfilled upon success", () => {
    const store = mockStore({});
    const expectedPayload = [
      { type: "FETCH_FACILITIES" },
      {
        type: "FETCH_FACILITIES_FULFILLED",
        payload: response
      }
    ];

    const value = "bahia";
    const filters = [];
    mockHttp
      .onGet(`facilities.json?q=${value}&f=${filters}`)
      .reply(200, response);

    return store.dispatch(fetchFacilities("bahia")).then(() => {
      expect(store.getActions()).toEqual(expectedPayload);
    });
  });
});
