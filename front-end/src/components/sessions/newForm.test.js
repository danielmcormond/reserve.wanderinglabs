import React from "react";
import { shallow } from "enzyme";

import { sessionNew } from "../../actions/sessionActions";
import { SessionNewForm } from "./newForm";

jest.mock("../../actions/sessionActions");

beforeEach(() => {
  sessionNew.mockClear();
});

describe("<SessionNewForm />", () => {
  it("renders SessionNewForm with a Connected Form", () => {
    const component = shallow(<SessionNewForm />);
    expect(component.find("Connect(Form)")).toHaveLength(1);
  });

  it("a submit calls handleSubmit", () => {
    const fake = {
      forms: {
        email: {
          value: "foo@example.com"
        }
      }
    };
    const dispatch = jest.fn();

    const component = shallow(<SessionNewForm />);
    component.setProps({ dispatch });
    component.find("Connect(Form)").simulate("submit", fake);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(sessionNew).toHaveBeenCalledWith("foo@example.com");
  });
});
