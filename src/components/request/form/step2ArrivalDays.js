import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { actions } from "react-redux-form";

@connect(store => {
  return {
    arrivalDays: store.availabilityRequestForm.step2.arrivalDays
  };
})
export default class RequestFormStep2ArrivalDays extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(
      actions.change("availabilityRequestForm.step2.arrivalDays", value.value)
    );
  };

  render() {
    const { arrivalDays } = this.props;
    const daysOptions = [
      { key: "0", value: "0", text: "Sunday" },
      { key: "1", value: "1", text: "Monday" },
      { key: "2", value: "2", text: "Tuesday" },
      { key: "3", value: "3", text: "Wednesday" },
      { key: "4", value: "4", text: "Thursday" },
      { key: "5", value: "5", text: "Friday" },
      { key: "6", value: "6", text: "Saturday" }
    ];
    return (
      <Dropdown
        selection
        fluid
        multiple
        search
        upward
        placeholder="Limit arrival to certain days."
        value={arrivalDays}
        options={daysOptions}
        onChange={this.handleChange}
      />
    );
  }
}
