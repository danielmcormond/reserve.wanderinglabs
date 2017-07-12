import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from "react-redux"
import { Dropdown } from 'semantic-ui-react'
import { actions, Errors } from 'react-redux-form';

import { fetchFacilities, setFacility } from "../actions/facilitiesActions"

@connect((store) => {
  return {
    facilities: store.facilities.facilities,
    facilityId: store.availabilityRequestForm.facilityId,
    loading: store.facilities.fetching,
  };
})
export default class FacilityLookup extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(actions.change('availabilityRequestForm.facilityId', value.value))
  }

  handleSearchChange = (e, value) => {
    this.props.dispatch(fetchFacilities(value))
  }

  render() {
    const { facilities, loading, facilityId } = this.props;

    return (
      <div>
        <Dropdown
          fluid
          search
          value={facilityId}
          placeholder='Search...'
          options={facilities}
          selection
          onChange={this.handleChange}
          onSearchChange={this.handleSearchChange}
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
