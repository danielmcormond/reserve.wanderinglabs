import userReducer, { initialState } from "./userReducer";

describe("userReducer", () => {
  it("sets the default state", () => {
    const state = userReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  it("Toggles Premium flag", () => {
    expect(initialState).toHaveProperty("premium", false);
    const action = { type: "SET_PREMIUM" };
    const state = userReducer(undefined, action);
    expect(state).toHaveProperty("premium", true);
  });

  it("Sets a premium amount", () => {
    expect(initialState).toHaveProperty("premiumAmount", 20);
    const action = { type: "SET_PREMIUM_AMOUNT", payload: 10 };
    const state = userReducer(undefined, action);
    expect(state).toHaveProperty("premiumAmount", 10);
  });
});
