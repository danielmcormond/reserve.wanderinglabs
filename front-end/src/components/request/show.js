import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  List
} from "semantic-ui-react";
import { Link } from "react-router-dom";

import DateFormat from "../utils/dateFormat";

import {
  fetchAvailabilityRequest,
  updateAvailabilityRequest,
  updateAvailabilityRequestStatus
} from "../../actions/availabilityRequestsActions";
import AvailabilityMatches from "../availabilityMatches";
import Premium from "../user/premium.js";

const connected = connect(store => {
  return {
    ar: store.availabilityRequests.ar
  };
});
export class RequestShow extends Component {
  componentWillMount() {
    console.log("params", this.props.match.params);
    if (this.props.match.params.status !== undefined) {
      this.props.dispatch(
        updateAvailabilityRequestStatus(
          this.props.match.params.uuid,
          this.props.match.params.status
        )
      );
    } else {
      this.props.dispatch(
        fetchAvailabilityRequest(this.props.match.params.uuid)
      );
    }
  }

  // TODO: refactor a better solution.. componentWillMount does not rerun when route calls same component again (click cancel button)
  componentWillReceiveProps(newProps) {
    if (
      newProps.match.params.status !== undefined &&
      newProps.match.params.status !== this.props.match.params.status
    ) {
      this.props.dispatch(
        updateAvailabilityRequestStatus(
          newProps.match.params.uuid,
          newProps.match.params.status
        )
      );
    } else if (newProps.match.params.uuid !== this.props.match.params.uuid) {
      this.props.dispatch(fetchAvailabilityRequest(newProps.match.params.uuid));
    }
  }

  toggleSms = () => {
    const uuid = this.props.ar.uuid;
    this.props.dispatch(
      updateAvailabilityRequest(uuid, { notify_sms: !this.props.ar.notify_sms })
    );
  };

  get statusButtonProps() {
    // TODO: Refactor.. ugly and check if dates in past.
    if (this.props.ar.status === "active") {
      return {
        content: "Cancel",
        to: `/c/${this.props.ar.uuid}`,
        color: "orange",
        negative: true
      };
    } else if (this.props.ar.status === "canceled") {
      return {
        content: "Activate",
        to: `/a/${this.props.ar.uuid}`,
        color: "green"
      };
    } else if (this.props.ar.status === "paused") {
      return {
        content: "UnPause",
        to: `/a/${this.props.ar.uuid}`,
        color: "orange"
      };
    } else {
      return { content: "Create New", to: "/new" };
    }
  }

  get titleStatus() {
    return (
      this.props.ar.status.charAt(0).toUpperCase() +
      this.props.ar.status.slice(1)
    );
  }

  render() {
    const { ar } = this.props;

    const halfGridProps = {
      tablet: 8,
      computer: 8,
      mobile: 8
    };

    return (
      <div>
        <Grid>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Header as="h3">
              <Icon name="map marker alternate" />
              <Header.Content>
                {ar.facility.name}
                <Header.Subheader>{ar.facility.sub_name}</Header.Subheader>
              </Header.Content>
            </Header>
            <Divider hidden />

            <Grid>
              <Grid.Row divided>
                <Grid.Column {...halfGridProps}>
                  <List relaxed>
                    <List.Item>
                      <List.Header>Arriving between</List.Header>
                      <List.Description>
                        <DateFormat format="MM/DD/YYYY" date={ar.date_start} />{" "}
                        & <DateFormat format="MM/DD/YYYY" date={ar.date_end} />
                      </List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Stay Length</List.Header>
                      <List.Description>
                        {ar.stay_length} nights
                      </List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Filters</List.Header>
                      <List.Description>{ar.summary}</List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Matching Site Count</List.Header>
                      <List.Description>{ar.site_count}</List.Description>
                    </List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column {...halfGridProps}>
                  <List size="medium" relaxed>
                    <List.Item>
                      <List.Header>Status</List.Header>
                      <List.Description>{this.titleStatus}</List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Checked Count</List.Header>
                      <List.Description>{ar.checked_count}</List.Description>
                    </List.Item>

                    {ar.checked_at && (
                      <List.Item>
                        <List.Header>Last Checked</List.Header>
                        <List.Description>
                          <DateFormat
                            format="M/D/YYYY hh:mm"
                            date={ar.checked_at}
                          />
                          {' '}
                          (<Link to={`/f/${ar.facility.id}/log`}>Log</Link>)
                        </List.Description>
                      </List.Item>
                    )}
                  </List>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column {...halfGridProps}>
                  <Checkbox
                    label="SMS Notifications"
                    checked={ar.notify_sms}
                    onChange={this.toggleSms}
                  />
                </Grid.Column>
                <Grid.Column {...halfGridProps}>
                  <Button
                    as={Link}
                    fluid
                    size="medium"
                    {...this.statusButtonProps}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column only="computer" computer="8">
            <Premium />
          </Grid.Column>
        </Grid>

        <AvailabilityMatches {...this.props} />
      </div>
    );
  }
}
export default connected(RequestShow);

// <Button
//   as={Link}
//   to={`/w/${ar.uuid}`}
//   fluid
//   color="green"
//   content="Go Premium"
//   positive
//   size="tiny"
// />
