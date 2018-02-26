import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Divider,
  Grid,
  Icon,
  Menu,
  Segment
} from "semantic-ui-react";

@connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated
  };
})
export default class Footer extends Component {
  render() {
    const { isAuthenticated } = this.props;
    return (
      <div className="footer">
        <Container>
          <Divider />
          <Grid>
            <Grid.Column computer="4" tablet="4" mobile="16">
              <Menu text vertical>
                <Menu.Item as={Link} to="/sign-in">
                  Sign In
                </Menu.Item>
                <Menu.Item as={Link} to="/new">
                  New Request
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column computer="8" tablet="8" mobile="16" textAlign="center">
              <Segment basic size="mini">
                <p>
                  <a href="http://wanderinglabs.com">Wandering Labs</a> is a
                  creation of{" "}
                  <a href="https://github.com/tiwatson">Tim Watson</a>
                </p>
                <p className="footerDisclaimer">
                  Wandering Labs is not affiliated with, maintained by, or in
                  any way officially connected with Recreation.gov, Reserve
                  America, or Active Network.
                </p>
              </Segment>
            </Grid.Column>
            <Grid.Column computer="4" tablet="4" mobile="16">
              <Menu text vertical className="footerMenuRight">
                <Menu.Item name="FAQ" />
                <Menu.Item name="Contact" />
              </Menu>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}
