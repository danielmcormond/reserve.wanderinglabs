import React, { Component } from 'react';
import { connect } from "react-redux"
import { Container, Icon, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { fetchAvailabilityRequest } from "../actions/availabilityRequestsActions"

@connect((store) => {
  return {
    ar: store.availabilityRequests.ar,
    loading: store.availabilityRequests.fetching,
  };
})
export default class RequestHeader extends Component {
  render() {
    const { ar } = this.props;

    return (
      <div>
        <Menu fixed='top' color='green' className='StepsNavMenu'>
          <Container>
            <Menu.Item as={Link} to='/' fitted='horizontally'>
              <Icon name='chevron left'/>
            </Menu.Item>
            <Menu.Item as={Link} to='/'  name='home' header>
              {ar.facility.name}
            </Menu.Item>
          </Container>
        </Menu>

        <div className="NavPushed" />
      </div>
    );
  }
}

