import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import RequestFormStep1Facility from './step1Facility.js'
import RequestFormStep1Table from './step1Table.js'
export default class RequestFormStep1 extends Component {
  render() {
    return (
      <Grid padded="vertically">
        <RequestFormStep1Facility />

        <Grid.Row>
          <Grid.Column computer="16" tablet="16" mobile="16">
            <RequestFormStep1Table />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

// <Grid.Column only="computer" computer="8">
//   <Premium />
// </Grid.Column>
