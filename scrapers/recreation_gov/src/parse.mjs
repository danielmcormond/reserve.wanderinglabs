import moment from "moment";

export default class Parse {
  constructor(response) {
    this.body = response;
  }

  do() {
    const json = this.body;

    // console.log(json)
    var final = new Array();

    for (const [siteId, attributes] of Object.entries(json.campsites)) {
      // console.log("\n\n--\n");
      // console.log(siteId);
      for (const [arrivalDate, status] of Object.entries(
        attributes.availabilities
      )) {
        if (status === "Available") {
          const formattedDate = moment(arrivalDate, "YYYY-MM-DD").format(
            "MM/DD/YYYY"
          );
          // console.log(final.length, siteId, formattedDate);
          final.push([siteId, formattedDate]);
        }
      }
    }
    return final;
  }
}
