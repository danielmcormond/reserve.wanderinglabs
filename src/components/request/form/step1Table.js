import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Label, List } from "semantic-ui-react";
import { Errors } from "react-redux-form";

import { formSetFacility } from "../../../actions/requestFormActions";

@connect(store => {
  return {
    facilities: store.facilities.facilities,
    step1: store.availabilityRequestForm.step1,
    step1Valid: store.availabilityRequestForm.forms.step1.$form.valid,
    loading: store.facilities.fetching
  };
})
export default class RequestFormStep1Table extends Component {
  handleChange = (e, value) => {
    this.props.dispatch(formSetFacility(value.value));
  };

  render() {
    const { facilities } = this.props;
    const mappedArs = facilities.map(facility =>
      <List.Item key={facility.id}>
        <List.Content floated="right">button</List.Content>
        <List.Content>
          <List.Header>
            {facility.name}
          </List.Header>
          <List.Description>
            {facility.sub_name}
          </List.Description>
        </List.Content>
      </List.Item>
    );
    return (
      <List selection divided size="large">
        {mappedArs}
      </List>
    );
  }
}
