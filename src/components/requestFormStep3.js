import React, { Component } from 'react';
import { Control } from 'react-redux-form';
import { Dropdown, Grid, Input } from 'semantic-ui-react'

import SelectType from './inputs/selectType'
import SemanticInput from './semanticInput'

export default class RequestFormStep3 extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column mobile='16'>
          <label>Site Type</label>
          <div>
            <Control
              model="request.type"
              component={SelectType}
            />
          </div>
        </Grid.Column>
        <Grid.Column mobile='8'>
          <Control
            model="request.length"
            component={SemanticInput}
          />
        </Grid.Column>
        <Grid.Column mobile='8'>
          <Control
            model="request.length"
            component={SemanticInput}
          />
        </Grid.Column>
      </Grid>
    )
  };
};
