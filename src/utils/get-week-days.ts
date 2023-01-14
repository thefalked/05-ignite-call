export function getWeekDays() {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })

  return Array.from(Array(7).keys())
    .map((day) => formatter.format(new Date(Date.UTC(2023, 1, day))))
    .map((weekDay) =>
      weekDay.substring(0, 1).toUpperCase().concat(weekDay.substring(1)),
    )
}
