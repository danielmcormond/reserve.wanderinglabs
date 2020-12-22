import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Checkbox, Divider, Grid, Header, Label, List, Segment } from 'semantic-ui-react'

import PaypalButton from './paypal'
import SemanticInput from '../semanticInput'
import SmsOverLimit from './SmsOverLimit'
import SmsSettingsAlert from './SmsSettingsAlert'
import PremiumMember from './PremiumMember'
import PremiumCTA from "./PremiumCTA"

const amounts = [15, 20, 25, 50]

const connected = connect(store => {
  return {
    premium: store.user.premium,
    premiumAmount: store.user.premiumAmount,
    smsUnderLimit: store.user.user.sms_under_limit
  }
})
export class PremiumAsk extends Component {
  premiumAmountChange = (e, { value }) => this.props.dispatch({ type: 'SET_PREMIUM_AMOUNT', payload: value })

  render() {
    const { premium, premiumAmount, smsUnderLimit } = this.props

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
      )
    })

    function premiumAsk() {
      return (
        <div>
          <Header as="h4">Premium Membership</Header>
          <p>
            Become a premium member by sending a few bucks our way and we will upgrade your request to include these
            benefits:
          </p>
          <List bulleted>
            <List.Item>Check twice as often (every 3-5 minutes)</List.Item>
            <List.Item>No pausing</List.Item>
            <List.Item>Txt alerts</List.Item>
          </List>

          <p>Any amount will get you premium status for a year. Send what you think this service is worth.</p>

          <div className="ui big form">
            <Grid>{amountCheckboxes}</Grid>
          </div>

          <Divider hidden />
          <Grid>
            <Grid.Column width="16" textAlign="center">
              <PaypalButton />
            </Grid.Column>
          </Grid>
        </div>
      )
    }

    const premiumMember = e => {
      return (
        <div>
          <Header as="h4">Thank You!</Header>
          <p>You are a premium member. Extra benefits have been activated. </p>

          {smsUnderLimit && <p>Consider continuing your support if this service is working for you.</p>}

          <Divider hidden />

          <p></p>

          <Grid>
            <Grid.Column width="4">
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
            <Grid.Column width="12">
              <PaypalButton />
            </Grid.Column>
          </Grid>
        </div>
      )
    }

    return (
      <>
        {premium && !smsUnderLimit && <SmsOverLimit />}
        {premium && smsUnderLimit && <SmsSettingsAlert />}
        {premium && <PremiumMember /> }
        {!premium && <PremiumCTA /> }
      </>
    )
  }
}
export default connected(PremiumAsk)
