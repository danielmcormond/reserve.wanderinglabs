import htmlToJson from 'html-to-json'

export default class Parse {
  constructor(response) {
    this.body = response
  }

  async do() {
    const html = this.body

    return htmlToJson.parse(html, function($doc, $) {
      return this.map('.tent, .rv-tent', function(tr) {

        // Dates are only available in the table header row
        // TODO: determine year and make these MM/DD/YYYY format
        const dates = $doc.find('.dateTemplate > .date')
          .map((index, element) => $(element).text()).toArray()

        // Determine availability by class name and merge actual date
        return {
          name: tr.data('site'),

          // The unique site ID appears to be the `invkey` data attribute,
          // which is only available when site is not reserved.
          inventoryKey: tr.children('.avail, .ctr').first().data('invkey'),

          // There is also a `pakey` attribute which stands for packageKey,
          // but I'm not exactly sure of it's purpose yet.
          // These fields are both sent as POST data when reserving a site
          packageKey: tr.children('.avail, .ctr').first().data('pakey'),

          // Parse the child table cells to determine availability
          availabilities: tr.children().not('.site')
            .map((index, element) => ({
              available: $(element).hasClass('avail') || $(element).hasClass('ctr'), // Call to reserve
              date: dates[index],
              price: $(element).text(),
              sold: $(element).hasClass('sold')
            })).toArray()
        }

      })
    })
  }
}
