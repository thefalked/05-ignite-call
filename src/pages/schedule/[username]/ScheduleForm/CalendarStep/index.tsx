import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { Calendar } from '../../../../../components/Calendar'
import { api } from '../../../../../lib/axios'
import {
  Container,
  TimePicker,
  TimePickerHeader,
  TimePickerItem,
  TimePickerList
} from './styles'

interface Availability {
  possibleTimes: number[]
  availableTimes: number[]
}

interface CalendarStepProps {
  onSelectDatetime: (date: Date) => void
}

export function CalendarStep({ onSelectDatetime }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  const router = useRouter()

  const username = String(router.query.username)

  const isDateSelected = !!selectedDate

  const weekDay = isDateSelected ? dayjs(selectedDate).format('dddd') : null

  const dateAndMonth = isDateSelected
    ? dayjs(selectedDate).format('DD[ de ]MMMM')
    : null

  const selectedDateWithoutTime = selectedDate
    ? dayjs(selectedDate).format('YYY-MM-DD')
    : null

  const { data: availability } = useQuery(
    ['availability', selectedDateWithoutTime],
    async () => {
      const { data } = await api.get<Availability>(
        `users/${username}/availability`,
        {
          params: {
            date: dayjs(selectedDate).format('YYYY-MM-DD'),
          },
        },
      )

      return data
    },
    {
      enabled: !!selectedDate,
    },
  )

  const handleSelectTime = (hour: number) => {
    const dateWithTime = dayjs(selectedDate)
      .set('hour', hour)
      .startOf('hour')
      .toDate()

    onSelectDatetime(dateWithTime)
  }

  return (
    <Container isTimePickerOpen={isDateSelected}>
      <Calendar selectedDate={selectedDate} onDateSelected={setSelectedDate} />

      {isDateSelected && (
        <TimePicker>
          <TimePickerHeader>
            {weekDay} <span>{dateAndMonth}</span>
          </TimePickerHeader>

          <TimePickerList>
            {availability?.possibleTimes.map((hour) => (
              <TimePickerItem
                key={hour}
                onClick={() => handleSelectTime(hour)}
                disabled={!availability.availableTimes.includes(hour)}
              >
                {String(hour).padStart(2, '0')}:00h
              </TimePickerItem>
            ))}
          </TimePickerList>
        </TimePicker>
      )}
    </Container>
  )
}
