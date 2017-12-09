import axios from "axios";
import React, { Component } from "react";
import { Form, Header } from "semantic-ui-react";
import find from "lodash.find";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      facilities: [],
      loaded: false,
      form: props.filterForm
    };
  }

  siteTypeOptions = [
    {
      text: "RV Sites",
      description: "Only sites suitable for RV's",
      value: "rv"
    },
    {
      text: "Tent or RV Sites",
      description: "You can tent in an RV site",
      value: "tent_or_rv"
    },
    {
      text: "Tent Only Sites",
      description: "No RV's",
      value: "tent"
    },
    {
      text: "Group Sites",
      description: "You and your friends",
      value: "group"
    },
    {
      text: "Other",
      description: "Cabins, Day Use, etc",
      value: "other"
    }
  ];

  electricOptions = [
    {
      text: "No preference",
      value: "",
      key: "none"
    },
    {
      text: "15 amps or more",
      value: "15",
      key: "15"
    },
    {
      text: "20 amps or more",
      value: "20",
      key: "20"
    },
    {
      text: "30 amps or more",
      value: "30",
      key: "30"
    },
    {
      text: "50 amp service",
      value: "50",
      key: "50"
    }
  ];

  componentDidMount() {
    this.setState({ loaded: false });
    const base = 'http://api-reserve-beta.wanderinglabs.com' // http://wl.dev'

    axios.get(`${base}/facilities/active.json`).then(res => {
      const facilities = res.data;
      this.setState({ facilities, loaded: true });
    });
  }

  handleChange = (e, { value }) => {
    this.setState({ form: { ...this.state.form, [e.target.name]: value } });
  };

  handleCheckboxChange = (e, value) => {
    this.setState({
      form: { ...this.state.form, [value.name]: value.checked }
    });
  };

  handleFacilityChange = (e, value) => {
    const facility = find(this.state.facilities, { id: value.value });
    this.setState({
      form: { ...this.state.form, facility, facilityId: value.value }
    });
  };

  handleSiteTypeChange = (e, value) => {
    const siteTypeObj = find(this.siteTypeOptions, { value: value.value });
    this.setState({
      form: {
        ...this.state.form,
        siteTypeText: siteTypeObj.text,
        siteType: value.value
      }
    });
  };

  handleElectricChange = (e, value) => {
    const electricObj = find(this.electricOptions, { value: value.value });
    this.setState({
      form: {
        ...this.state.form,
        electricText: electricObj.text,
        electric: value.value
      }
    });
  };

  handleSubmit = () => {
    const { form } = this.state;
    this.props.onFilterChange(form);
  };

  render() {
    const { facilities, loaded, form } = this.state;

    const facilitiesOptions = facilities.map(facility => {
      return {
        key: facility.id,
        text: facility.name,
        value: facility.id,
        content: (
          <Header
            size="medium"
            content={facility.name}
            subheader={facility.sub_name}
          />
        )
      };
    });

    return (
      <Form size="huge" onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Select
            label="Facility"
            options={facilitiesOptions}
            name="facilityId"
            onChange={this.handleFacilityChange}
            value={form.facilityId}
            loading={!loaded}
          />
        </Form.Group>

        <Form.Group>
          <Form.Select
            label="Site Type"
            name="siteType"
            options={this.siteTypeOptions}
            onChange={this.handleSiteTypeChange}
            value={form.siteType}
          />
        </Form.Group>

        <Form.Group>
          <Form.Input
            label="Stay Length"
            placeholder="(In Days)"
            name="stayLength"
            value={form.stayLength}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group>
          <Form.Select
            label="Electric"
            name="electric"
            options={this.electricOptions}
            onChange={this.handleElectricChange}
            value={form.electric}
          />
        </Form.Group>

        <Form.Group inline>
          <Form.Checkbox
            label="Water"
            name="water"
            checked={form.water}
            onChange={this.handleCheckboxChange}
          />
          <Form.Checkbox
            label="Sewer"
            name="sewer"
            checked={form.sewer}
            onChange={this.handleCheckboxChange}
          />
          <Form.Checkbox
            label="Pull Thru"
            name="pullThru"
            checked={form.pullThru}
            onChange={this.handleCheckboxChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    );
  }
}

export default Filter;
