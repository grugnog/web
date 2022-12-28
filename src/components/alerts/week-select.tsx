import { useEffect, useState, useCallback, memo, FC, useRef } from 'react'
import { addDays, format, startOfWeek } from 'date-fns'
import { GrMoon, GrSun } from 'react-icons/gr'
import { Button } from '../general'
import { classNames } from '@app/utils/classes'

interface Props {
  confirmDates(dates: number[], morning: boolean): Promise<void>
  filterEmailDates: number[]
  disabled?: boolean
  defaultDayTime?: boolean
  id?: string // top level id for dom
}

const week = [0, 1, 2, 3, 4, 5, 6]
const startDate = startOfWeek(new Date())
const activeColor = 'rgb(59 130 246)'
const timeBtnStyle = 'flex place-content-center place-items-center gap-x-2 w-28'
const activeStyles = {
  borderColor: activeColor,
  color: activeColor,
}

const WeekSelectComponent: FC<Props> = ({
  confirmDates,
  filterEmailDates,
  disabled,
  defaultDayTime,
  id,
}) => {
  const [selected, setSelected] = useState<number[]>(filterEmailDates ?? [])
  const [morning, setMorning] = useState<boolean>(!!defaultDayTime)
  const initialDate = useRef<boolean>(false)
  const initialDayTime = useRef<boolean>(false)

  useEffect(() => {
    if (filterEmailDates && !initialDate.current) {
      setSelected(filterEmailDates)
      initialDate.current = true
    }
    if (defaultDayTime && !initialDayTime.current) {
      setMorning(defaultDayTime)
      initialDayTime.current = true
    }
  }, [filterEmailDates, defaultDayTime, setSelected, initialDate, setMorning])

  const onDateConfirm = useCallback(
    async (period: boolean) => {
      const validItems = selected.filter(
        (item) => Number.isInteger(item) && item >= 0
      )
      await confirmDates(validItems, period)
    },
    [confirmDates, selected]
  )

  const selectDates = useCallback(
    async (day: number) => {
      const items = [...selected]
      const selectedDate = items.indexOf(day)

      if (selectedDate !== -1) {
        items.splice(selectedDate, 1)
      } else {
        items.push(day)
      }

      setSelected(items)

      const validItems = items.filter(
        (item) => Number.isInteger(item) && item >= 0
      )

      await confirmDates(validItems, morning)
    },
    [setSelected, selected, morning, confirmDates]
  )

  const onPeriodToggleMorning = useCallback(async () => {
    setMorning(true)
    await onDateConfirm(true)
  }, [setMorning, onDateConfirm])

  const onPeriodToggleNight = useCallback(async () => {
    setMorning(false)
    await onDateConfirm(false)
  }, [setMorning, onDateConfirm])

  const disabledStyles = !disabled
    ? ''
    : 'bg-gray-300 text-gray-600 md:bg-gray-300'

  return (
    <div id={id ?? 'notification-selector'}>
      <p className={`text-sm`}>
        Set what day of the week to disable notifications.
      </p>
      <div className={'flex gap-x-1 flex-wrap gap-y-2 py-3'}>
        {week.map((day) => (
          <button
            onClick={() => selectDates(day)}
            className={classNames(
              `text-base md:text-lg font-semibold border rounded flex-1 px-2 py-3`,
              selected.includes(day)
                ? 'bg-blue-500 text-white hover:opacity-90'
                : 'hover:opacity-70',
              disabledStyles
            )}
            disabled={disabled}
            key={day}
          >
            {format(addDays(startDate, day), 'eeee')}
          </button>
        ))}
      </div>
      <div className='py-2 space-y-2 border-t border-dotted'>
        <div className='flex space-x-2'>
          <Button
            onClick={onPeriodToggleMorning}
            style={morning && !disabled ? activeStyles : {}}
            className={classNames(timeBtnStyle, disabledStyles)}
            disabled={disabled}
          >
            <GrSun
              style={morning && !disabled ? { fill: activeColor } : {}}
              className={'grIcon'}
            />
            Morning
          </Button>
          <Button
            onClick={onPeriodToggleNight}
            style={!morning && !disabled ? activeStyles : {}}
            className={classNames(timeBtnStyle, disabledStyles)}
            disabled={disabled}
          >
            <GrMoon
              style={!morning && !disabled ? { fill: activeColor } : {}}
              className={'grIcon'}
            />
            Night
          </Button>
        </div>
      </div>
    </div>
  )
}

export const WeekSelect = memo(WeekSelectComponent)
