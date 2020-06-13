
export default async function parse(body) {
  return new Promise((resolve) => {
    const json = JSON.parse(body);

    const final = [];

    for (const [site, ymd] of Object.entries(json.availability)) {
      for (const [year, md] of Object.entries(ymd)) {
        for (const [month, d] of Object.entries(md)) {
          for (const [day, avail] of Object.entries(d)) {
            if (avail !== 0) {
              final.push([site, `${month}/${day}/${year}`]);
            }
          }
        }
      }
    }

    resolve(final);
  });
}
