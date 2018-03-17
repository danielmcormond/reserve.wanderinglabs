import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Checkbox,
  Divider,
  Grid,
  Header,
  List,
  Segment
} from "semantic-ui-react";

import PaypalButton from "./paypal";

const amounts = [10, 20, 25, 50];

@connect(store => {
  return {
    premium: store.user.premium,
    premiumAmount: store.user.premiumAmount
  };
})
export default class Premium extends Component {
  premiumAmountChange = (e, { value }) =>
    this.props.dispatch({ type: "SET_PREMIUM_AMOUNT", payload: value });

  render() {
    const { premium, premiumAmount } = this.props;

    const amountCheckboxes = amounts.map(a => {
      return (
        <Grid.Column width="4" key={a}>
          <div className="field">
            <Checkbox
              className="premium"
              label={`$${a}`}
              value={a}
              checked={premiumAmount === a}
              onChange={this.premiumAmountChange}
            />
          </div>
        </Grid.Column>
      );
    });

    function premiumAsk() {
      return (
        <div>
          <Header as="h4">Premium Membership</Header>
          <p>
            Become a premium member by sending a few bucks our way and we will
            upgrade your request to include these benifits:
          </p>
          <List bulleted>
            <List.Item>Check twice as often</List.Item>
            <List.Item>No pausing</List.Item>
            <List.Item>Txt alerts</List.Item>
          </List>

          <p>
            Any amount will get you premium status for a year. Send what you
            think this service is worth.
          </p>

          <div className="ui big form">
            <Grid>
              {amountCheckboxes}
            </Grid>
          </div>

          <Divider hidden />
          <Grid>
            <Grid.Column width="16" textAlign="center">
              <PaypalButton />
            </Grid.Column>
          </Grid>
        </div>
      );
    }

    function premiumMember() {
      return (
        <div>
          <Header as="h4">Thank You!</Header>
          <p>You are a premium member. Extra benifits have been activated. </p>

          <p>
            I greatly appreciate your support. Please do not hesitate to contact
            me if you have a question or an idea! info@wanderinglabs.com
            <br/>
            - Tim Watson
          </p>
        </div>
      );
    }

    return (
      <Segment color="green">
        {premium ? premiumMember() : premiumAsk()}
      </Segment>
    );
  }
}
