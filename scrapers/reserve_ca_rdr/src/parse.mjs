import moment from "moment";

export default class Parse {
  constructor(response) {
    this.body = response;
    if (this.body.Facility.Units === null) {
      throw new Error('No units found. Facility not in operation')
    }
  }

  do() {
    var final = new Array();

    for (const [siteId, attributes] of Object.entries(this.body.Facility.Units)) {
      // console.log("\n\n--\n");
      // console.log(siteId);

      for (const [siteDate, dayAttributes] of Object.entries(attributes.Slices)) {
        if (dayAttributes.IsFree === true) {
          const formattedDate = moment(dayAttributes.Date, "YYYY-MM-DD").format("MM/DD/YYYY");
          // console.log(final.length, siteId, `${attributes.UnitId}`, formattedDate);
          final.push([`${attributes.UnitId}`, formattedDate]);
        }
      }
    }
    // console.log(final);
    return final;
  }
}
