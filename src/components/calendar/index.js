'use client'
import React, {useMemo} from 'react'
import {
    Calendar,
    Views,
    momentLocalizer,
  } from 'react-big-calendar'

  import moment from 'moment'
  import * as dates from '@/utils/dates'
  import events from '@/resources/event'

  const mLocalizer = momentLocalizer(moment)

export const EventCalendar = ({
    localizer = mLocalizer,
    ...props
  }) => {


    const { components, defaultDate, max, views } = useMemo(
        () => ({
          defaultDate: new Date(2024, 3, 1),
          max: dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours'),
          views: ['month', 'week', 'day', 'agenda'],
        }),
        []
      )
    
  return (
    <div className=" min-h-[500px] h-auto rounded  w-full bg-white p-4">
    <Calendar
    //   components={components}
      defaultDate={defaultDate}
      events={events}
      localizer={localizer}
      startAccessor="start"
      endAccessor="end"
    //   max={max}
      showMultiDayTimes
        className='min-h-[500px] h-full'
      step={30}
      views={views}
    />
  </div>
  )
}
