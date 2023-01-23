export const convertTimeStringToMinutes = (timeString: string) => {
  const [hour, minutes] = timeString.split(':').map(Number)

  return hour * 60 + minutes
}
