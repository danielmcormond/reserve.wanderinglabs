import React, { Component } from "react";
import { Header, Label, Table } from "semantic-ui-react";
import moment from "moment";
import DayView from "./dayView";

class CalendarDay extends Component {
  state = { dayView: false };

  toggleVisibility = () => this.setState({ dayView: !this.state.dayView });

  render() {
    const { dayView } = this.state;
    const { day, dates, loaded, stayLength } = this.props;
    const fdate = day.format("YYYY-MM-DD");
    let amount = " ";
    let dayColor = "teal";
    let leftColor = "grey";
    let rightColor = "grey";
    if (loaded === true && day.isSameOrAfter(moment())) {
      if (dates.hasOwnProperty(fdate)) {
        amount = dates[fdate];
        dayColor = "green";
        rightColor = "green";
      } else {
        amount = "_";
        dayColor = "teal";
        leftColor = "red";
        rightColor = "red";
      }

      for (var i = 1; i <= stayLength; i++) {
        const pdate = moment(day).subtract(i, "day");
        if (pdate.isSameOrAfter(moment())) {
          if (leftColor === "grey") leftColor = "red";
          const pdateKey = pdate.format("YYYY-MM-DD");
          if (dates.hasOwnProperty(pdateKey)) {
            leftColor = "green";
            if (i !== stayLength) {
              rightColor = "green";
            }
          }
        }
      }
    }

    return (
      <Table.Cell key={day.format()}>
        <Header size="medium" basic className="dayHeader">
          {day.date() === 1 ? day.format("MMM D") : day.format("D")}
        </Header>

        <div
          className={
            "availabilities " + leftColor + "Left " + rightColor + "Right"
          }
        >
          <Label
            circular
            color={dayColor}
            size="large"
            onClick={this.toggleVisibility}
          >
            {amount}
          </Label>
        </div>

        {dayView ? <DayView day={day} /> : null}
      </Table.Cell>
    );
  }
}

export default CalendarDay;
