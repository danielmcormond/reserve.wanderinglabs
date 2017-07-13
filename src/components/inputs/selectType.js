import React from "react";
import { Dropdown } from "semantic-ui-react";

// import { friendOptions } from '../common'
let friendOptions = [
  {
    text: "RV Sites",
    description: "Only sites suitable for RV's",
    value: "rv_sites",
    active: true
  },
  {
    text: "Tent or RV Sites",
    description: "You can tent in an RV site",
    value: "tent_or_rv_sites"
  },
  {
    text: "Tent Only Sites",
    description: "No RV's",
    value: "tent_sites"
  },
  {
    text: "Group Sites",
    description: "You and your friends",
    value: "group_sites"
  }
];

const SelectType = () =>
  <Dropdown
    placeholder="Site Type"
    fluid
    selection
    options={friendOptions}
    value={friendOptions[0]["value"]}
  />;

export default SelectType;
