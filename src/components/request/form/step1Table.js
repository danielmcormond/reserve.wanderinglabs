import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Label, List, Icon } from "semantic-ui-react";
import { Errors } from "react-redux-form";

import {
  formSetFacility,
  formStepInc
} from "../../../actions/requestFormActions";

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
    this.props.dispatch(formSetFacility(value.id));
    this.props.dispatch(formStepInc());
  };

  render() {
    const { facilities } = this.props;
    const mappedArs = facilities.map(facility =>
      <List.Item key={facility.id} id={facility.id} onClick={this.handleChange}>
        <List.Content floated="right">
          <Icon name="arrow circle right" size="big" color="green" />
        </List.Content>
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
      <div>
        <Header as="h5" dividing content="Top Results:" />

        <List selection divided size="small">
          {mappedArs}
        </List>
      </div>
    );
  }
}
