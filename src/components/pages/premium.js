import React, { Component } from "react";

import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";

import Premium from "../user/premium.js";

@connect(store => {
  return { premium: store.user.premium };
})
export default class PagePremium extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Premium />
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <p>
            Still working on adding some text here about the premium service we
            offer.
          </p>
        </Grid.Column>
      </Grid>
    );
  }
}
