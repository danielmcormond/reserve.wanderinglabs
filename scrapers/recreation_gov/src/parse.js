import _ from "lodash";
import moment from "moment";

class Parse {
  constructor(response) {
    this.body = response;
  }

  do() {
    return new Promise((resolve, reject) => {
      const json = JSON.parse(this.body);

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
            console.log(final.length, siteId, formattedDate);
            final.push([siteId, formattedDate]);
          }
        }
      }
      return resolve(final);
    });
  }
}

export { Parse };
