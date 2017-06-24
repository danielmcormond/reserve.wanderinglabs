import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

import Layout from "./layout"


export default class Nav extends Component {
  render() {
    return (
      <div className="ui fixed inverted menu">
        <div className="ui container">
          <a href="#" className="header item">
            Project Name
          </a>
          <a href="#" className="item">Home</a>
          <Link to="/">Home</Link>
          <Link to="/new">New</Link>

          <div className="ui simple dropdown item">
            Dropdown <i className="dropdown icon"></i>
            <div className="menu">
              <a className="item" href="#">Link Item</a>
              <a className="item" href="#">Link Item</a>
              <div className="divider"></div>
              <div className="header">Header Item</div>
              <div className="item">
                <i className="dropdown icon"></i>
                Sub Menu
                <div className="menu">
                  <a className="item" href="#">Link Item</a>
                  <a className="item" href="#">Link Item</a>
                </div>
              </div>
              <a className="item" href="#">Link Item</a>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
