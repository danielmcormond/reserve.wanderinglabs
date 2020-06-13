import moment from 'moment';

export default async function parse(body) {
  return new Promise((resolve) => {
    const json = JSON.parse(body);

    // console.log(json)
    const final = [];

    json.records.forEach((record) => {
      record.availabilityGrid.forEach((avail) => {
        if (avail.status === 'AVAILABLE') {
          const formattedDate = moment(avail.date, "YYYY-MM-DD").format(
            "MM/DD/YYYY"
          );

          final.push([record.id, formattedDate]);
        }
      });
    });

    resolve(final);
  });
}
