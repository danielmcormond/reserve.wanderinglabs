import React, { Component } from 'react';
import { connect } from "react-redux"
import { Progress } from 'semantic-ui-react'

@connect((store) => {
  return {
    // TODO: This is terrible.. (but working)
    loading: (store.facilities.fetching || store.availabilityMatches.fetching || store.availabilityRequests.fetching)
  };
})
export default class Loading extends Component {
  render() {
    const { loading } = this.props;

    return(
      <div></div>
    );

    // TODO FIX JUMPING
    // return (
    //   <div>
    //     { loading && <Progress percent='100' size='tiny' color='green' active autoSuccess /> }
    //   </div>
    // );
  }
}

