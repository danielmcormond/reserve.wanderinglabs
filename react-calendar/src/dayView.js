import axios from "axios";
import React, { Component } from "react";
import { Header, List, Modal } from "semantic-ui-react";

import moment from "moment";

class DayView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availabilities: [],
      loaded: false
    };
  }

  componentDidMount() {
    const fdate = this.props.day.format("YYYY-MM-DD");
    axios
      .get(`http://wl.dev/facilities/4744/availabilities.json?date=${fdate}`)
      .then(res => {
        const availabilities = res.data;
        this.setState({ availabilities, loaded: true });
      });
  }
  render() {
    const { availabilities, loaded } = this.state;
    const { day } = this.props;

    const mappedAvailabilities = availabilities.map(avail => {
      return (
        <List.Item>
          <List.Content>
            <List.Header as="a">Site Num: {avail.site.site_num}</List.Header>
            <List.Description as="a">{avail.site.site_type}</List.Description>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <Modal defaultOpen closeIcon>
        <Modal.Header>
          Matching Available Sites for <br />
          {day.format("YYYY-MM-DD")}
        </Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <List divided relaxed selection>
              {loaded && mappedAvailabilities}
            </List>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default DayView;
