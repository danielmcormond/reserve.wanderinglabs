export default function dateRange(startDate, endDate, time = { days: 1 }) {
  const timePeriods = [];
  const day = startDate.clone();

  while (day <= endDate) {
    timePeriods.push(day.clone());
    day.add(time);
  }

  return timePeriods;
}
