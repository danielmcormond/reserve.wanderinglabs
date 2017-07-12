import React, { Component } from 'react';
import _ from 'lodash'
import { connect } from "react-redux"
import { Dropdown, Header, Label } from 'semantic-ui-react'
import { actions, Errors } from 'react-redux-form';

import { fetchFacilities } from "../../../actions/facilitiesActions"
import { formStepValidate } from '../../../actions/requestFormActions'

@connect((store) => {
  return {
    facilities: store.facilities.facilities,
    step1: store.availabilityRequestForm.step1,
    step1Valid: store.availabilityRequestForm.forms.step1.$form.valid,
    loading: store.facilities.fetching,
  };
})
export default class RequestFormStep1 extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(actions.change('availabilityRequestForm.step1.facilityId', value.value))
    this.props.dispatch(formStepValidate()) // Get rid of errors upon selection
  }

  handleSearchChange = (e, value) => {
    this.props.dispatch(fetchFacilities(value))
  }

  render() {
    const { facilities, step1, step1Valid } = this.props;
    const facilityId = step1.facilityId;

    return (
      <div>
        <Header as='h4'>Campground or Facility to reserve at:</Header>

        <Dropdown
          error={!!!step1Valid}
          fluid
          search
          value={facilityId}
          placeholder='Search...'
          options={facilities}
          selection
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
        />
        <Errors
          model="availabilityRequestForm.step1.facilityId"
          messages={{
            required: 'You must select a campground',
          }}
          component={(props) => <Label basic color='green' pointing>{props.children}</Label> }
        />

      </div>
    )
  };
};

//         <Dropdown selection text='State' labeled icon='filter'  button className='icon' defaultValue='AL' options={stateOptions} />
//     const stateOptions = [ { key: 'AL', value: 'AL', text: 'Alabama' }, { key: 'AL1', value: 'AL1', text: 'Alabama1' } ]


// const mappedOptions = facilities.map(facility => {
//   return (
//     <Dropdown.Item key={facility.key} value={facility.key} onClick={this.handleChange}>
//       {facility.text}
//     </Dropdown.Item>
//   )
// });

// <Dropdown.Menu scrolling={false}>
//   {mappedOptions}
// </Dropdown.Menu>
