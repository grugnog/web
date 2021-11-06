/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useEffect, useState, useCallback, memo, FC } from 'react'
import { Button } from '@a11ywatch/ui'
import { Typography, Button as MatButton } from '@material-ui/core'
import { CalendarToday as DateIcon } from '@material-ui/icons'
import { addDays, format, startOfWeek } from 'date-fns'

interface Props {
  confirmDates(dates: number[]): Promise<void>
  filterEmailDates: number[]
}

const week = [0, 1, 2, 3, 4, 5, 6]
const startDate = startOfWeek(new Date())

const WeekSelectComponent: FC<Props> = ({ confirmDates, filterEmailDates }) => {
  const [selected, setSelected] = useState<number[]>(filterEmailDates ?? [])

  useEffect(() => {
    if (filterEmailDates) {
      setSelected(filterEmailDates)
    }
  }, [filterEmailDates, setSelected])

  const onDateConfirm = useCallback(async () => {
    const validItems = selected.filter(
      (item) => Number.isInteger(item) && item >= 0
    )
    await confirmDates(validItems)
  }, [confirmDates, selected])

  const selectDates = useCallback(
    (day: number) => {
      const items = [...selected]
      const selectedDate = items.indexOf(day)

      if (selectedDate !== -1) {
        items.splice(selectedDate, 1)
      } else {
        items.push(day)
      }

      setSelected(items)
    },
    [setSelected, selected]
  )

  return (
    <div>
      <div>
        <Typography component={'h2'} variant={'h5'} className={`text-xl py-4`}>
          Disable notifications on selected days
        </Typography>
        <div className={'flex space-x-2'}>
          {week.map((day) => (
            <Button
              onClick={() => selectDates(day)}
              className={`text-large hover:text-black${
                selected.includes(day) ? ' bg-secondary' : ''
              }`}
              key={day}
            >
              {format(addDays(startDate, day), 'eeee')}
            </Button>
          ))}
        </div>
        <div className={'py-6'}>
          <MatButton
            onClick={onDateConfirm}
            variant={'contained'}
            startIcon={<DateIcon />}
          >
            Confirm Dates
          </MatButton>
        </div>
      </div>
    </div>
  )
}

const WeekSelect = memo(WeekSelectComponent)

export { WeekSelect, WeekSelectComponent }
