import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Divider, Grid, Icon, Menu } from "semantic-ui-react";

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
        <Divider hidden />
        <Container>
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
            <Grid.Column computer="8" tablet="8" mobile="16">
              Disclaimer etc
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
