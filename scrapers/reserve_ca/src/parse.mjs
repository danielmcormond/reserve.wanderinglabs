import _ from 'lodash';

export default class Parse {
  constructor(response) {
    this.body = response;
  }

  do() {
    return new Promise((resolve, reject) => {
      // UnitDetailPopup.aspx?facility_id=346
      // \u0026amp;unit_id=4528
      // \u0026amp;arrival_date=8/29/2017 12:00:00 AM
      // \u0026amp;dis=8/29/2017 12:00:00 AM
      // \u0026amp;is_available=true
      // \u0026#39;,
      // \u0026#39;4528
      // \u0026#39;,
      // \u0026#39;8/29/2017
      // \u0026#39;,
      // \u0026#39;0
      // \u0026#39;,
      // \u0026#39;0
      // \u0026#39;
      // );\"
      var availablityPageMatch = this.body.match(/generateAvailabilityCellDefinitions/gi);
      if ((availablityPageMatch === null) || (availablityPageMatch.length === 0)) {
        console.log('FATAL.. availablityPageMatch NULL', this.body)
        return reject('Fatal: non availability page')
      }

      var regexp = /UnitDetailPopup(.*?)#39/gi;
      var matches_array = this.body.match(regexp);

      var avail_array = _.filter(matches_array, (match) => {
        return (match.includes('is_available=true'));
      });

      var cleaned_array = avail_array.map((match) => {
        var unit = match.match(/unit_id\=(.*?)\&/)[1];
        var day = match.match(/arrival_date\=(.*?)\s/)[1];
        return [unit, day];
      })
      return resolve(cleaned_array);
    });
  }
}
