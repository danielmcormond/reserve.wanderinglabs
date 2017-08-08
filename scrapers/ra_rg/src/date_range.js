import moment from 'moment';

exports.getRange = ((startDate, endDate) => {
  var timePeriods = [];
  var day = startDate.clone();

  while (day <= endDate) {
    timePeriods.push(day.format('M/D/YYYY'));
    day.add(1, 'day');
  }

  return timePeriods;
});
