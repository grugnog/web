import { useEffect, useState, useCallback, memo, FC } from 'react'
import { addDays, format, startOfWeek } from 'date-fns'
import { GrMoon, GrSun } from 'react-icons/gr'
import { Button } from '../general'

interface Props {
  confirmDates(dates: number[], morning: boolean): Promise<void>
  filterEmailDates: number[]
}

const week = [0, 1, 2, 3, 4, 5, 6]
const startDate = startOfWeek(new Date())
const activeColor = 'rgb(59 130 246)'

const timeBtnStyle = 'flex place-content-center place-items-center gap-x-2 w-28'

const WeekSelectComponent: FC<Props> = ({ confirmDates, filterEmailDates }) => {
  const [selected, setSelected] = useState<number[]>(filterEmailDates ?? [])
  const [morning, setMorning] = useState<boolean>(true)

  useEffect(() => {
    if (filterEmailDates) {
      setSelected(filterEmailDates)
    }
  }, [filterEmailDates, setSelected])

  const onDateConfirm = useCallback(async () => {
    const validItems = selected.filter(
      (item) => Number.isInteger(item) && item >= 0
    )
    await confirmDates(validItems, morning)
  }, [confirmDates, selected, morning])

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

  const activeStyles = {
    borderColor: activeColor,
    color: activeColor,
  }

  return (
    <div>
      <h2 className={`text-xl`}>Disable notifications on selected days.</h2>
      <div className={'flex gap-x-2 flex-wrap gap-y-2 py-4'}>
        {week.map((day) => (
          <button
            onClick={() => selectDates(day)}
            className={`text-xl md:text-2xl font-bold border rounded flex-1 h-[70px] px-2 py-4${
              selected.includes(day)
                ? ' bg-black text-white hover:opacity-90'
                : ' hover:bg-gray-200'
            }`}
            key={day}
          >
            {format(addDays(startDate, day), 'eeee')}
          </button>
        ))}
      </div>
      <div className='py-4 border px-4 rounded space-y-2'>
        <h3 className='text-lg'>
          Determine alert setting preference, day or night.
        </h3>
        <div className='flex space-x-2 py-2'>
          <Button
            onClick={() => setMorning(true)}
            style={morning ? activeStyles : {}}
            className={timeBtnStyle}
          >
            <GrSun
              style={morning ? { fill: activeColor } : {}}
              className={'grIcon'}
            />
            Morning
          </Button>
          <Button
            onClick={() => setMorning(false)}
            style={!morning ? activeStyles : {}}
            className={timeBtnStyle}
          >
            <GrMoon
              style={!morning ? { fill: activeColor } : {}}
              className={'grIcon'}
            />
            Night
          </Button>
        </div>
      </div>
      <div className={'py-6'}>
        <Button
          onClick={onDateConfirm}
          className={
            'text-base text-blue-700 border-blue-700 border-2 md:px-10 md:rounded'
          }
        >
          Update
        </Button>
      </div>
    </div>
  )
}

const WeekSelect = memo(WeekSelectComponent)

export { WeekSelect, WeekSelectComponent }
