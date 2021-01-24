import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Grid, Header, Icon, Button } from 'semantic-ui-react'

import { Link } from 'react-router-dom'
import { userSettings } from '../../actions/userActions'

import Premium from './premium.js'
import UserEmail from './Email'
import UserSms from './Sms'
import WebNotificationsWrapper from './WebNotificationsWrapper'

const connected = connect(store => {
  return {
    isAuthenticated: store.session.isAuthenticated,
    user: store.user.user,
    premium: store.user.premium
  }
})
export class UserSettings extends Component {
  componentWillMount() {
    this.props.dispatch(userSettings())
  }

  render() {
    const { user, isAuthenticated, premium } = this.props

    return (
      <div>
        <Header as="h4">
          <Icon name="id badge" color="green" />
          <Header.Content>{user.email}</Header.Content>
        </Header>
        <Grid>
          <Grid.Column computer="8" tablet="8" mobile="16">
            {isAuthenticated && (
              <Button name="sessionDestroy" as={Link} to="/sign-out" content="Sign Out" color="grey" />
            )}

            {!!!isAuthenticated && <Button name="sessionNew" as={Link} to="/sign-in" content="Sign In" color="green" />}

            <Divider hidden />

            {premium ? (
              <div>
                <UserSms />
                <Divider hidden />
                <UserEmail />
                <Divider hidden />
                {user.feature_web_notifications && <WebNotificationsWrapper />}
              </div>
            ) : (
              <p>Premium members can get notified via SMS.</p>
            )}
          </Grid.Column>
          <Grid.Column computer="8" tablet="8" mobile="16">
            <Premium />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

// {user.feature_web_notifications && <WebNotifications />}
// {isAuthenticated &&
//   <Menu.Item as={Link} to="/settings">
//     Account
//   </Menu.Item>}
export default connected(UserSettings)
