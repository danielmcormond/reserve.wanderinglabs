import moment from "moment";

function DateRange(startDate, endDate) {
  var timePeriods = [];
  var day = startDate.clone();
  var currentWeek = [];

  while (day <= endDate) {
    if (currentWeek.length > 0 && currentWeek[0].week() !== day.week()) {
      timePeriods.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
    day = moment(day).add(1, "day");
  }
  timePeriods.push(currentWeek);
  return timePeriods;
}

export { DateRange };
