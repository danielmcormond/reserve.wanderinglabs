import xml2js from 'xml2js';

export default async function parse(body) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(body, (err, result) => {
      if (err) {
        reject(err);
      }

      const availableResult = result.resultset.result.filter(
        filterObject => filterObject.$.availabilityStatus === 'Y'
          && filterObject.$.reservationChannel === 'Web Reservable',
      );
      const availableSiteIds = availableResult.map(mapObject => mapObject.$.SiteId);
      resolve(availableSiteIds);
    });
  });
}
