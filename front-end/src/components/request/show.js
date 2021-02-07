import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Checkbox, Divider, Grid, Header, Icon, List } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import DateFormat, { dateHasPast } from '../utils/dateFormat'

import {
  fetchAvailabilityRequest,
  updateAvailabilityRequest,
  updateAvailabilityRequestStatus
} from '../../actions/availabilityRequestsActions'
import AvailabilityMatches from '../availabilityMatches'
import Premium from '../user/premium.js'
import OutOfOrder from './OutOfOrder'
import Sites from './Sites'
import Calendar from '../Calendar/Calendar'
import Notifications from '../Notifications/Index'

const connected = connect(store => {
  return {
    ar: store.availabilityRequests.ar,
    availabilityRequestExtra: store.availabilityRequests.extra
  }
})
export class RequestShow extends Component {
  componentWillMount() {
    if (this.props.match.params.status !== undefined) {
      this.props.dispatch(updateAvailabilityRequestStatus(this.props.match.params.uuid, this.props.match.params.status))
    } else {
      this.props.dispatch(fetchAvailabilityRequest(this.props.match.params.uuid))
    }
  }

  // TODO: refactor a better solution.. componentWillMount does not rerun when route calls same component again (click cancel button)
  componentWillReceiveProps(newProps) {
    if (newProps.match.params.status !== undefined && newProps.match.params.status !== this.props.match.params.status) {
      this.props.dispatch(updateAvailabilityRequestStatus(newProps.match.params.uuid, newProps.match.params.status))
    } else if (newProps.match.params.uuid !== this.props.match.params.uuid) {
      this.props.dispatch(fetchAvailabilityRequest(newProps.match.params.uuid))
    }
  }

  toggleSms = () => {
    const uuid = this.props.ar.uuid
    this.props.dispatch(updateAvailabilityRequest(uuid, { notify_sms: !this.props.ar.notify_sms }))
  }

  setExtra = extra => {
    this.props.dispatch({ type: 'SET_AR_EXTRA', payload: extra })
  }

  get statusButtonProps() {
    // TODO: Refactor.. ugly and check if dates in past.
    if (this.props.ar.status === 'active') {
      return {
        content: 'Cancel',
        to: `/c/${this.props.ar.uuid}`,
        color: 'orange',
        negative: true
      }
    } else if (this.props.ar.status === 'canceled') {
      return {
        content: 'Activate',
        to: `/a/${this.props.ar.uuid}`,
        color: 'green'
      }
    } else if (this.props.ar.status === 'paused') {
      return {
        content: 'UnPause',
        to: `/a/${this.props.ar.uuid}`,
        color: 'orange'
      }
    } else {
      return { content: 'Create New', to: '/new' }
    }
  }

  get titleStatus() {
    return this.props.ar.status.charAt(0).toUpperCase() + this.props.ar.status.slice(1)
  }

  render() {
    const { ar, availabilityRequestExtra } = this.props

    const halfGridProps = {
      tablet: 8,
      computer: 8,
      mobile: 8
    }

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
                {dateHasPast(ar.date_end) && (
                  <Grid.Column computer="16" tablet="16" mobile="16">
                    <div className="text-gray-400 text-2xl font-semibold mb-8">
                      This request has expired and is no longer being checked.
                    </div>
                  </Grid.Column>
                )}

                <Grid.Column {...halfGridProps}>
                  <List relaxed>
                    <List.Item>
                      <List.Header>Arriving between</List.Header>
                      <List.Description>
                        <DateFormat format="MM/DD/YYYY" date={ar.date_start} /> &{' '}
                        <DateFormat format="MM/DD/YYYY" date={ar.date_end} />
                      </List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Stay Length</List.Header>
                      <List.Description>{ar.stay_length} nights</List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Filters</List.Header>
                      <List.Description>{ar.summary}</List.Description>
                    </List.Item>

                    <List.Item>
                      <List.Header>Matching Site Count</List.Header>
                      <List.Description>
                        {ar.site_count} {ar.site_count > 0 && <Sites />}
                      </List.Description>
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

                    <List.Item>
                      <List.Header>Last Checked</List.Header>
                      <List.Description>
                        {ar.checked_at && <DateFormat format="M/D/YYYY hh:mm" date={ar.checked_at} />} (
                        <Link to={`/logs/${ar.facility.id}`}>Log</Link>)
                      </List.Description>
                    </List.Item>
                  </List>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                {ar.facility.out_of_order && (
                  <Grid.Column computer="16" tablet="16" mobile="16">
                    <OutOfOrder facility={ar.facility} />
                  </Grid.Column>
                )}

                {!dateHasPast(ar.date_end) && (
                  <>
                    <Grid.Column {...halfGridProps}>
                      <Checkbox label="SMS Notifications" checked={ar.notify_sms} onChange={this.toggleSms} />
                    </Grid.Column>
                    <Grid.Column {...halfGridProps}>
                      <Button as={Link} fluid size="medium" {...this.statusButtonProps} />

                      <div className="mt-4">
                        <Button
                          as={Link}
                          fluid
                          size="medium"
                          content="Edit"
                          to={`/edit/${this.props.ar.uuid}`}
                          color="orange"
                        />
                      </div>
                    </Grid.Column>
                  </>
                )}
              </Grid.Row>
            </Grid>
          </Grid.Column>

          <Grid.Column only="computer" computer="8">
            <Premium />
          </Grid.Column>
        </Grid>

        <div className="sub-nav-wrapper">
          <div className={`sub-nav ${availabilityRequestExtra === 'matches' && 'sub-nav-active'}`}>
            <span onClick={() => this.setExtra('matches')}>Availabilities</span>
          </div>
          <div className={`sub-nav ${availabilityRequestExtra === 'calendar' && 'sub-nav-active'}`}>
            <span onClick={() => this.setExtra('calendar')}>Calendar</span>
          </div>
          <div className={`sub-nav ${availabilityRequestExtra === 'notifications' && 'sub-nav-active'}`}>
            <span onClick={() => this.setExtra('notifications')}>Notifications</span>
          </div>
        </div>

        {availabilityRequestExtra === 'matches' && <AvailabilityMatches {...this.props} />}
        {availabilityRequestExtra === 'calendar' && <Calendar />}
        {availabilityRequestExtra === 'notifications' && <Notifications />}
      </div>
    )
  }
}
export default connected(RequestShow)

//         <Calendar />
// <AvailabilityMatches {...this.props} />
// <Button
//   as={Link}
//   to={`/w/${ar.uuid}`}
//   fluid
//   color="green"
//   content="Go Premium"
//   positive
//   size="tiny"
// />
