import React, { Component } from "react";
import { Button, Divider, Grid, Header, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

import SessionNewForm from "./newForm";

export class SessionNew extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column computer="8" tablet="12" mobile="16">
          <Header as="h2">
            <Icon name="user" color="green" />
            <Header.Content>
              Your Account
              <Header.Subheader>
                We don't use passwords.
                <br />
                We email you a special link to access your account.
              </Header.Subheader>
            </Header.Content>
          </Header>

          <SessionNewForm />

          <Divider hidden />
          <Divider />

          <Header as="h4" content="Haven't used us yet?" />

          <Button
            as={Link}
            to="/new"
            color="green"
            size="tiny"
            content="Create a new request!"
          />
        </Grid.Column>
      </Grid>
    );
  }
}
export default SessionNew;
