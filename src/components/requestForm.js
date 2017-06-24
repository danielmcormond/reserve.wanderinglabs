import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { fetchAvailabilityRequests } from "../actions/availabilityRequestsActions"

const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

class RequestForm extends Component {

  render() {
    const { handleSubmit, load, pristine, reset, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <button type="button" >Load Account</button>
        </div>
        <div>
          <label>First Name</label>
          <div>
            <Field
              name="facility_id"
              component="input"
              type="text"
              placeholder="First Name"
            />
          </div>
        </div>
        <div>
          <label>Last Name</label>
          <div>
            <Field
              name="id"
              component="input"
              type="text"
              placeholder="Last Name"
            />
          </div>
        </div>
        <div>
          <label>Age</label>
          <div>
            <Field name="age" component="input" type="number" placeholder="Age" />
          </div>
        </div>
        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field name="sex" component="input" type="radio" value="male" />
              {' '}
              Male
            </label>
            <label>
              <Field name="sex" component="input" type="radio" value="female" />
              {' '}
              Female
            </label>
          </div>
        </div>
        <div>
          <label>Favorite Color</label>
          <div>
            <Field name="favoriteColor" component="select">
              <option value="">Select a color...</option>
              {colors.map(colorOption => (
                <option value={colorOption} key={colorOption}>
                  {colorOption}
                </option>
              ))}
            </Field>
          </div>
        </div>
        <div>
          <label htmlFor="employed">Employed</label>
          <div>
            <Field
              name="employed"
              id="employed"
              component="input"
              type="checkbox"
            />
          </div>
        </div>
        <div>
          <label>Bio</label>
          <div>
            <Field name="bio" component="textarea" />
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Undo Changes
          </button>
        </div>
      </form>
    );
  }
};



// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
RequestForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(RequestForm);

// // You have to connect() to any reducers that you wish to connect to yourself
// RequestForm = connect(
//   state => ({
//     initialValues: state.availabilityRequests.ars[0], // pull initial values from account reducer
//   }),
//   { load: fetchAvailabilityRequests }, // bind account loading action creator
// )(RequestForm);

export default RequestForm;
