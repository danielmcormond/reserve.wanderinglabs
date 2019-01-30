import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Divider,
  Grid,
  Header,
  Label,
  Segment
} from "semantic-ui-react";

import PaypalButton from "../user/paypal";
import SemanticInput from "../semanticInput";

const connected = connect(store => {
  return {
    premiumAmount: store.user.premiumAmount
  };
});
export class AvailabilityMatchClickThankYou extends Component {
  premiumAmountChange = (e, { value }) =>
    this.props.dispatch({ type: "SET_PREMIUM_AMOUNT", payload: value });

  render() {
    const { premiumAmount } = this.props;

    return (
      <Segment color="green">
        <div>
          <Header as="h4">Want to say thanks?</Header>
          <p>Help keep this tool alive</p>

          <Divider hidden />

          <Grid>
            <Grid.Column computer="8" tablet="8" mobile="8">
              <SemanticInput
                defaultValue={premiumAmount}
                onChange={this.premiumAmountChange}
                labelPosition="left"
                type="text"
              >
                <Label basic>$</Label>
                <input />
              </SemanticInput>
            </Grid.Column>
            <Grid.Column computer="8" tablet="8" mobile="16">
              <PaypalButton />
            </Grid.Column>
          </Grid>
        </div>
      </Segment>
    );
  }
}
export default connected(AvailabilityMatchClickThankYou);
