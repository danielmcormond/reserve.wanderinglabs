import pkg from 'html-to-json'
const { request } = pkg

request({
  form: {
    accountKey: 14,
    park_id: 14,
    stage: 1
  },
  method: 'POST',
  url: 'https://reserve.southcarolinaparks.com/reserve/camping/parkwide.html'
}, function($doc, $) {
  return this.map('.tent, .rv-tent', function(tr) {

    // Campsite meta data is scattered between table row and cell element attributes
    let site = Object.assign(tr.data(), tr.children('.site').data())

    // Dates are only available in the table header row
    // TODO: determine year and make these date objects or JSON strings?
    let dates = $doc.find('.dateTemplate > .date')
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
.done(function(result) {
  debugger
  console.log(result)
})
