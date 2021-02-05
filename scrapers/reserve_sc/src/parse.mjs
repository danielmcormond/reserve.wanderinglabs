import htmlToJson from 'html-to-json'

export default class Parse {
  constructor(response) {
    this.body = response
  }

  async do() {
    const html = this.body

    return htmlToJson.parse(html, function($doc, $) {

      // Find and loop thru dates in the table header row
      return $doc.find('.dateTemplate').children().map((i, el) => {

          // Skip first table column which is just site names
          if (i < 1) { return }

          // Find table cells matching the current column index
          const matchingColumnCells =
            $doc.find(`#calendar > .tableWrap > table > tbody > tr > td:nth-child(${i + 1})`)
                                                            // nth-child is one-based indexed

          // Find available sites and return their IDs
          const availableSiteIds =
            matchingColumnCells.map((i, el) => {
              if($(el).hasClass('avail')) {
                return $(el).data('invkey')
              }
            }).toArray()

          return [[$(el).text(), availableSiteIds]] // Example: ['Thu 02/04', [123, 125, 129]]

        }).toArray()
      }
    )

  }
}
