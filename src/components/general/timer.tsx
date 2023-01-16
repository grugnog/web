'use client'

import { classNames } from '@app/utils/classes'
import { useState, useEffect } from 'react'

// TODO: allow scan duration or crawl per setting based on property crawlDuration or scanDuration
export const Timer = ({
  stop,
  duration,
  shutdown,
}: {
  stop?: boolean
  duration?: number
  shutdown?: boolean
}) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    if (stop) {
      clearInterval(interval)
    } else if (!stop && duration) {
      setSeconds(0)
    }
    return () => clearInterval(interval)
  }, [stop, duration])

  const defaultDuration = duration ? Number(duration / 1000) : 0
  const displayTimer = (seconds ? seconds : defaultDuration).toFixed(0)

  return (
    <div
      className={classNames(
        `rounded-3xl w-8 h-8 p-1 md:w-9 md:h-9 items-center justify-center flex truncate font-semibold border ${
          seconds > 100 ? 'text-[.72rem]' : 'text-xs'
        }`,
        shutdown ? 'text-red-700 border-red-800' : ''
      )}
    >
      {displayTimer}s
    </div>
  )
}
