import React, { Component } from "react";
import { connect } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { actions } from "react-redux-form";

const connected = connect(store => {
  return {
    arrivalDays: store.availabilityRequestForm.arrivalDays
  };
})
export class RequestFormStep2ArrivalDays extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(
      actions.change("availabilityRequestForm.arrivalDays", value.value)
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
        className="big"
        selection
        fluid
        multiple
        search
        upward
        placeholder="Click to select"
        value={arrivalDays}
        options={daysOptions}
        onChange={this.handleChange}
      />
    );
  }
}
export default connected(RequestFormStep2ArrivalDays);
