import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header, Icon, Label, List, Loader } from "semantic-ui-react";
import { push } from "connected-react-router";

import Premium from "../user/premium.js";
import DateFormat from "../utils/dateFormat";
import { fetchAvailabilityRequests } from "../../actions/availabilityRequestsActions";

const connected = connect(store => {
  return {
    ars: store.availabilityRequests.ars,
    fetching: store.availabilityRequests.fetching,
    fetched: store.availabilityRequests.fetched
  };
})
export class RequestAll extends Component {
  componentWillMount() {
    if (this.props.fetched === false) {
      this.props.dispatch(fetchAvailabilityRequests());
    }
  }

  clickedItem(uuid) {
    this.props.dispatch(push(`/${uuid}`));
  }

  render() {
    const { ars, fetching } = this.props;
    const mappedArs = ars.map(ar =>
      <List.Item key={ar.uuid} onClick={() => this.clickedItem(ar.uuid)}>
        <List.Content floated="right">
          {ar.notify_sms && <Icon name="mobile alternate" size="large" />}

          <Label
            circular
            color={ar.matches_availabile_count > 0 ? "green" : "grey"}
            size="large"
            content={ar.matches_availabile_count}
          />
        </List.Content>
        <List.Content>
          <List.Header>{ar.facility.name}</List.Header>
          <DateFormat format="MM/DD" date={ar.date_start} />
          &nbsp;to&nbsp;
          <DateFormat format="MM/DD/YYYY" date={ar.date_end} />
        </List.Content>
      </List.Item>
    );

    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Header as="h4">
            <Icon name="list layout" />
            <Header.Content>Your requests:</Header.Content>
          </Header>
          <List selection divided size="large" relaxed="very">
            {mappedArs}
          </List>
          <Loader active={fetching} size="big" />
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Premium />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connected(RequestAll);
