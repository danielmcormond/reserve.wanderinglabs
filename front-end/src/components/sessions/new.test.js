import React from "react";
import { shallow } from "enzyme";

import { SessionNew } from "./new";

describe("<SessionNew />", () => {
  it("renders SessionNew ", () => {
    const component = shallow(<SessionNew />);
    expect(component.find("Grid")).toHaveLength(1);
  });
});
