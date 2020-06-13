export default function dateRange(startDate, endDate) {
  const timePeriods = [];
  const day = startDate.clone();

  while (day <= endDate) {
    timePeriods.push(day.format('YYYY-MM-DD'));
    day.add(14, 'day');
  }

  return timePeriods;
}
