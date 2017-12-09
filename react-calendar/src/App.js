import React, { Component } from "react";

import "./semantic/semantic.min.css";
import "./App.css";

import { Container, Button, Menu } from "semantic-ui-react";

import Filter from "./filter";

import Calendar from "./Calendar";
import CalendarHeader from "./CalendarHeader";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleFilterChange = this.handleFilterChange.bind(this);

    this.state = {
      visible: true,
      form: {
        facility: { name: "Default name here" },
        stayLength: 5,
        facilityId: 4744,
        water: false,
        sewer: false,
        pullThru: false,
        siteType: "rv",
        siteTypeText: "RV Sites",
        electric: null,
        electricText: null
      }
    };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  handleFilterChange = form => {
    this.setState({ form: form, visible: true });
  };

  render() {
    const { visible, form } = this.state;
    return (
      <div className="App">
        <Menu borderless inverted color="green" size="large">
          <Container>
            <Menu.Item header name="home" to="/">
              Wandering Labs :: Reserve
            </Menu.Item>
            <Menu.Item
              name={visible ? "Filter" : "Calendar"}
              onClick={this.toggleVisibility}
            />
          </Container>
        </Menu>

        <Container className="mainContainer">
          {visible === true ? (
            <div>
              <CalendarHeader filterForm={form} />
              <Calendar filterForm={form} />
            </div>
          ) : (
            <Filter
              onFilterChange={this.handleFilterChange}
              filterForm={form}
            />
          )}
        </Container>
      </div>
    );
  }
}

export default App;
