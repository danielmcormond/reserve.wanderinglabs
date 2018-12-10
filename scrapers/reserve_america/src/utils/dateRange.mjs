export default function dateRange(startDate, endDate) {
  const timePeriods = [];
  const day = startDate.clone();

  while (day <= endDate) {
    timePeriods.push(day.format('M/D/YYYY'));
    day.add(1, 'day');
  }

  return timePeriods;
}
