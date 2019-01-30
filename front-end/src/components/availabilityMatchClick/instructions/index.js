import React, { Component } from "react";

import { AvailabilityMatchClickInstructionsRecreationGov } from "./recreationGov";
import { AvailabilityMatchClickInstructionsReserveCalifornia } from "./reserveCalifornia";
import { AvailabilityMatchClickInstructionsReserveAmerica } from "./reserveAmerica";

export class AvailabilityMatchClickInstructions extends Component {
  render() {
    const availabilityMatch = this.props;

    switch (availabilityMatch.facility_type) {
      case "Facility::ReserveCalifornia":
        return (
          <AvailabilityMatchClickInstructionsReserveCalifornia
            {...availabilityMatch}
          />
        );
      case "Facility::ReserveAmerica":
        return (
          <AvailabilityMatchClickInstructionsReserveAmerica
            {...availabilityMatch}
          />
        );
      case "Facility::RecreationGovBa":
        return (
          <AvailabilityMatchClickInstructionsRecreationGov
            {...availabilityMatch}
          />
        );
      default:
        return null;
    }
  }
}
