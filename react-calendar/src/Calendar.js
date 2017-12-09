import axios from "axios";
import React, { Component } from "react";
import { Table, Responsive } from "semantic-ui-react";
import moment from "moment";
import qs from "qs";

import { DateRange } from "./dateRange";
import CalendarDay from "./CalendarDay";

class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [],
      loaded: false
    };
  }

  componentDidMount() {
    const facilityId = this.props.filterForm.facilityId;
    const params = {
      stay_length: this.props.filterForm.stayLength,
      site_type: this.props.filterForm.siteType,
      water: this.props.filterForm.water,
      sewer: this.props.filterForm.sewer,
      pullthru: this.props.filterForm.pullThru,
      min_electric: this.props.filterForm.electric
    };

    const base = 'http://api-reserve-beta.wanderinglabs.com' // http://wl.dev'

    axios
      .get(
        `${base}/facilities/${
          facilityId
        }/availabilities/calendar.json?${qs.stringify({
          availability_request: params
        })}`
      )
      .then(res => {
        const dates = res.data;
        this.setState({ dates, loaded: true });
      });
  }

  render() {
    const { dates, loaded } = this.state;
    const { filterForm } = this.props;

    const startDate = moment().startOf("week");
    const endDate = moment(startDate)
      .add(6, "months")
      .endOf("week");
    var timePeriods = DateRange(startDate, endDate);

    function mappedDays(week) {
      return week.map(day => {
        return <CalendarDay day={day} dates={dates} loaded={loaded} stayLength={filterForm.stayLength} />;
      });
    }

    const mappedWeeks = timePeriods.map(week => {
      return <Table.Row key={week[0].week()}>{mappedDays(week)}</Table.Row>;
    });

    return (
      <Table  columns="7" unstackable={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Sun</Responsive>
              <Responsive minWidth={641}>Sunday</Responsive>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Mon</Responsive>
              <Responsive minWidth={641}>Monday</Responsive>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Tues</Responsive>
              <Responsive minWidth={641}>Tuesday</Responsive>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Wed</Responsive>
              <Responsive minWidth={641}>Wednesday</Responsive>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Th</Responsive>
              <Responsive minWidth={641}>Thursday</Responsive>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Fri</Responsive>
              <Responsive minWidth={641}>Friday</Responsive>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Responsive maxWidth={640}>Sat</Responsive>
              <Responsive minWidth={641}>Saturday</Responsive>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{mappedWeeks}</Table.Body>
      </Table>
    );
    // return <div className="month">{mappedWeeks}</div>;
  }
}

export default Calendar;
