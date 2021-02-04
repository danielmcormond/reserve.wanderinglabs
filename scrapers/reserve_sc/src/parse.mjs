import htmlToJson from 'html-to-json'
import moment from 'moment'

export default class Parse {
  constructor(response) {
    this.body = response
  }

  async do() {
    const html = this.body

    return htmlToJson.parse(html, {
      dates: ['.dateTemplate > .date', date => date.text()],
      sites: ['.tent, .rv-tent', function(tr) {
        return {
          name: tr.data('site'),

          // The unique site ID appears to be the `invkey` data attribute,
          // which is only available when site is not reserved.
          inventoryKey: tr.children('.avail, .ctr').first().data('invkey'),

          // Parse the child table cells to determine availability
          dates: tr.children().not('.site')
            .map((i, el) => ({
              available: this.$(el).hasClass('avail') || this.$(el).hasClass('ctr'), // Call to reserve
              price: this.$(el).text(),
              sold: this.$(el).hasClass('sold')
            })).toArray()
        }
      }]

    })
  }
}
