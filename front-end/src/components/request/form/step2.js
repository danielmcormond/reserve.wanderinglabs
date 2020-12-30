import React, { Component } from "react";
import { connect } from "react-redux";
import DayPicker, { DateUtils } from "react-day-picker";
import dayjs from "dayjs"
import { Divider, Grid, Header, Label, Icon } from "semantic-ui-react";
import { actions, Control, Errors } from "react-redux-form";

import RequestFormStepButtons from "./stepButtons";
import SemanticInput from "../../semanticInput";
import RequestFormStep2ArrivalDays from "./step2ArrivalDays";
import "../../../dayPicker.css";

const connected = connect(store => {
  return {
    dateStart: store.availabilityRequestForm.dateStart,
    dateEnd: store.availabilityRequestForm.dateEnd,
    step2Valid: store.forms.availabilityRequestForm.$form.valid
  };
})
export class RequestFormStep2 extends Component {
  handleDayClick = day => {
    const range = DateUtils.addDayToRange(day, {
      from: this.props.dateStart,
      to: this.props.dateEnd
    });
    this.props.dispatch(
      actions.change("availabilityRequestForm.dateStart", range.from)
    );
    this.props.dispatch(
      actions.change("availabilityRequestForm.dateEnd", range.to)
    );
  };
  handleResetClick = e => {
    e.preventDefault();
    this.props.dispatch(
      actions.change("availabilityRequestForm.dateStart", null)
    );
    this.props.dispatch(
      actions.change("availabilityRequestForm.dateEnd", null)
    );
  };

  render() {
    const { dateStart, dateEnd } = this.props;

    return (
      <Grid padded="vertically">
        <Grid.Column computer="8" tablet="16" mobile="16">
          <Header size="tiny">
            {!dateStart &&
              !dateEnd &&
              <span>
                Select the <strong>first day</strong> you are available to
                arrive.
              </span>}
            {dateStart &&
              !dateEnd &&
              <span>
                Select the <strong>last day</strong> you are available to
                arrive.
              </span>}
            {dateStart &&
              dateEnd &&
              <div>
                <Label size="large">
                  <Icon name="calendar" />
                  {dayjs(dateStart).format("MM/DD/YYYY")} -{" "}
                  {dayjs(dateEnd).format("MM/DD/YYYY")}
                  <Icon name="delete" onClick={this.handleResetClick} />
                </Label>
              </div>}
          </Header>
          <DayPicker
            numberOfMonths={1}
            selectedDays={[dateStart, { from: dateStart, to: dateEnd }]}
            onDayClick={this.handleDayClick}
            fixedWeeks
            pagedNavigation
            modifiers={{
              disabled: { before: new Date() }
            }}
          />
          <Errors
            model="availabilityRequestForm.dateStart"
            messages={{
              required: "Select a date"
            }}
            component={props =>
              <Label basic color="green" pointing>
                {props.children}
              </Label>}
          />
        </Grid.Column>
        <Grid.Column computer="8" tablet="16" mobile="16">
          <Control
            model=".stayLength"
            component={SemanticInput}
            controlProps={{
              label: "Length of stay (in days):"
            }}
          />
          <Errors
            model="availabilityRequestForm.stayLength"
            messages={{
              required: "Enter a stay length"
            }}
            component={props =>
              <Label basic color="green" pointing>
                {props.children}
              </Label>}
          />

          <Divider hidden />
          <Divider hidden />


          <label>Only arrive on specific weekdays (optional):</label>
          <RequestFormStep2ArrivalDays />
        </Grid.Column>

        <Grid.Column computer="16" tablet="16" mobile="16">
          <RequestFormStepButtons />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connected(RequestFormStep2);
