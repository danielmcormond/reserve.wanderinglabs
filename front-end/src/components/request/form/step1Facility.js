import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Input, Label } from 'semantic-ui-react'
import { Errors } from 'react-redux-form'
import debounce from 'debounce'

import FacilityFilter from './AgencyFilter/IndexReactModal'

import { fetchFacilities } from '../../../actions/facilitiesActions'

const connected = connect(store => {
  return {
    facilities: store.facilities.facilities,
    step1: store.availabilityRequestForm,
    step1Valid: store.forms.availabilityRequestForm.$form.valid,
    loading: store.facilities.fetching
  }
})
export class RequestFormStep1Facility extends Component {
  state = { search: '' }

  componentWillMount() {
    this.doFetchFacilities()
  }

  doFetchFacilities = debounce(() => {
    const { search } = this.state
    this.props.dispatch(fetchFacilities(search))
  }, 400)

  handleSearchChange = event => {
    this.setState({ search: event.target.value }, () => {
      this.doFetchFacilities()
    })
  }

  render() {
    const { loading } = this.props

    return (
      <Grid.Row>
        <Grid.Column computer="16" tablet="16" mobile="16">
        <label>Campground or Facility to reserve at:</label>
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <Input
            fluid
            loading={loading}
            icon="search"
            placeholder="Search..."
            onChange={this.handleSearchChange}
            style={{ margin: '.25em 0' }}
          />
          <Errors
            model="availabilityRequestForm.facilityId"
            messages={{
              required: 'You must select a campground'
            }}
            component={props => (
              <Label basic color="green" pointing>
                {props.children}
              </Label>
            )}
          />
        </Grid.Column>
        <Grid.Column computer="8" tablet="8" mobile="16">
          <FacilityFilter />
        </Grid.Column>
      </Grid.Row>
    )
  }
}
export default connected(RequestFormStep1Facility)
