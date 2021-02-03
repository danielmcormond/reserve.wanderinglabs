import pkg from 'html-to-json'
const { parse } = pkg

export default class Parse {
  constructor(response) {
    this.body = response
  }

  async do() {
    const html = this.body

    return parse(html, function($doc, $) {
      return this.map('.tent, .rv-tent', function(tr) {

        // Merge campsite meta data scattered between table row and cell element attributes
        const site = Object.assign(tr.data(), tr.children('.site').data())

        // Dates are only available in the table header row
        // TODO: determine year and make these date objects or JSON strings?
        const dates = $doc.find('.dateTemplate > .date')
          .map((index, element) => $(element).text()).toArray()

        // Determine availability by class name and merge actual date
        site.availabilities = tr.children().not('.site')
          .map((index, element) => ({
            available: $(element).hasClass('avail'),
            date: dates[index],
            price: $(element).text(),
            sold: $(element).hasClass('sold')
          })).toArray()

        return site
      })
    })
  }
}
