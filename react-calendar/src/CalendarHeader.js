import React from "react";
import { Button, Header } from "semantic-ui-react";

function CalendarHeader({ filterForm }) {
  let searchParams = `${filterForm.siteTypeText} for ${
    filterForm.stayLength
  } night`;
  if (filterForm.stayLength > 1) searchParams += "s";

  let whereParams = [];
  if (filterForm.electric) whereParams.push(filterForm.electricText);
  if (filterForm.water) whereParams.push("water");
  if (filterForm.sewer) whereParams.push("sewer");
  if (filterForm.pullThru) whereParams.push("pull thru");

  if (whereParams.length > 0) {
    const whereParamsString = whereParams
      .filter(function(val) {
        if (val) return val;
      })
      .join(", ");
    searchParams += ` with ${whereParamsString}`;
  }

  return (
    <div>
      <Button color="green" size="medium" floated="right">
        Edit
      </Button>
      <Header size="large">
        <Header.Content>{filterForm.facility.name}</Header.Content>
        <Header.Subheader>{searchParams}</Header.Subheader>
      </Header>
    </div>
  );
}

export default CalendarHeader;
