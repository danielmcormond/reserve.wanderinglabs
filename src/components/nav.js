import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class Nav extends Component {
  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <Link to="/" className="header item">Reserve</Link>
          <Link to="/new" className="item">New</Link>
        </div>
      </div>
    );
  }
}
