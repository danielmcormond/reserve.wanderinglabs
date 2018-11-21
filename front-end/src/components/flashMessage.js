import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Message } from 'semantic-ui-react'

@connect((store) => {
  return {
    message: store.flash.message,
    style: store.flash.style
  }
})
export default class FlashMessage extends Component {
  isStyle(styleAttr) {
    return styleAttr === this.props.style;
  }

  render() {
    const { message } = this.props;

    return (
      <Message error={this.isStyle('error')} success={this.isStyle('success')} hidden={!!!message}>
        <Message.Header>{message}</Message.Header>
      </Message>
    );
  }
}
