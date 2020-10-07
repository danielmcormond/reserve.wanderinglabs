import cheerio from "cheerio"

export default class Parse {
  constructor(response) {
    this.body = response;
  }

  do() {
    const html = cheerio.load(this.body)

    const final = new Array();

    html('.plotpoint').each((i, plotpoint) => {
      // console.log('plotpoint', plotpoint.attribs.class, plotpoint.attribs['data-siteid'])
      if (plotpoint.attribs.class.includes('avail')) {
        final.push(plotpoint.attribs['data-siteid'])
      }
    })

    return final;
  }
}
