import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";

import reserveApi from "../utils/axios";
import {
  sessionNew,
  sessionCreate,
  sessionSuccess,
  sessionDestroy
} from "./sessionActions";
import * as AppConstants from "../utils/constants";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mockHttp = new MockAdapter(reserveApi);

describe("sessionSuccess action", () => {
  const token = "abc123";
  const store = mockStore({});

  it("stores token in localstorage", () => {
    store.dispatch(sessionSuccess(token));
    expect(localStorage.getItem("token")).toEqual(token);

    const expectedPayload = [
      {
        type: "SESSION_SUCCESS",
        payload: { token }
      }
    ];
    expect(store.getActions()).toEqual(expectedPayload);
  });
});

describe("sessionDestroy action", () => {
  const token = null;
  const store = mockStore({});

  it("removes token localstorage and resets undef", () => {
    store.dispatch(sessionDestroy());
    expect(localStorage.getItem("token")).toEqual("null");

    const expectedPayload = [
      {
        type: "SESSION_SUCCESS",
        payload: { token }
      },
      {
        payload: { args: ["/"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      },
      {
        payload: { message: AppConstants.SESSION_LOGGED_OUT, style: "success" },
        type: "FLASH_MESSAGE"
      }
    ];
    expect(store.getActions()).toEqual(expectedPayload);
  });
});

describe("sessionNew action", () => {
  const response = {};

  it("redirects to home page and sets flash message upon success", () => {
    const store = mockStore({});
    const expectedPayload = [
      {
        payload: { args: ["/"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      },
      {
        payload: { message: AppConstants.SESSION_SUCCESS, style: "success" },
        type: "FLASH_MESSAGE"
      }
    ];

    const email = "foo@example.com";
    mockHttp.onPost("login_tokens", { email }).reply(200, response);

    return store.dispatch(sessionNew(email)).then(() => {
      expect(store.getActions()).toEqual(expectedPayload);
    });
  });

  it("redirects to home page and sets flash message upon not found", () => {
    const store = mockStore({});
    const expectedPayload = [
      {
        payload: { args: ["/"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      },
      {
        payload: {
          message: AppConstants.SESSION_FAILURE,
          style: "error"
        },
        type: "FLASH_MESSAGE"
      }
    ];

    const email = "foo@example.com";
    mockHttp.onPost("login_tokens", { email }).reply(404, response);

    return store.dispatch(sessionNew(email)).then(() => {
      expect(store.getActions()).toEqual(expectedPayload);
    });
  });
});

describe("sessionCreate action", () => {
  it("redirects to home page and sets flash message upon success", () => {
    const store = mockStore({});
    const expectedPayload = [
      { payload: { token: "barfoo" }, type: "SESSION_SUCCESS" },
      { payload: { email: "foo@example.com" }, type: "FETCH_USER_FULFILLED" },
      {
        payload: { args: ["/"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      }
    ];

    const token = "foobar";
    const response = {
      auth_token: "barfoo",
      user: { email: "foo@example.com" }
    };
    mockHttp.onPost("sessions", { token }).reply(200, response);

    return store.dispatch(sessionCreate(token)).then(() => {
      expect(store.getActions()).toEqual(expectedPayload);
    });
  });

  it("redirects to sign in page and sets flash message upon bad token", () => {
    const store = mockStore({});
    const expectedPayload = [
      {
        payload: { args: ["/sign-in"], method: "push" },
        type: "@@router/CALL_HISTORY_METHOD"
      },
      {
        payload: {
          message: AppConstants.SESSION_BAD_TOKEN,
          style: "error"
        },
        type: "FLASH_MESSAGE"
      }
    ];

    const token = "foobar";
    const response = {};
    mockHttp.onPost("sessions", { token }).reply(401, response);

    return store.dispatch(sessionCreate(token)).then(() => {
      expect(store.getActions()).toEqual(expectedPayload);
    });
  });
});
