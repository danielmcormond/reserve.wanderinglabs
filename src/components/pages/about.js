import React, { Component } from "react";
import { Grid, Header } from "semantic-ui-react";

export default class PageAbout extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Header as="h4">
            <Header.Content>About</Header.Content>
          </Header>
          <p>Coming soon</p>

          <p>
            <a href="http://wanderinglabs.com">Wandering Labs</a> is a creation
            of <a href="https://github.com/tiwatson">Tim Watson</a>
          </p>
          <p>
            Wandering Labs is not affiliated with, maintained by, or in any way
            officially connected with Reserve California, Recreation.gov,
            Reserve America, or Active Network.
          </p>
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Header as="h4">
            <Header.Content>FAQ</Header.Content>
          </Header>
          <p>Coming Soon</p>
        </Grid.Column>
      </Grid>
    );
  }
}
