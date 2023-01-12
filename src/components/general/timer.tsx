'use client'

import { useState, useEffect } from 'react'

// TODO: allow scan duration or crawl per setting based on property crawlDuration or scanDuration
export const Timer = ({
  stop,
  duration,
}: {
  stop?: boolean
  duration?: number
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
      className={`rounded-3xl p-1 w-9 h-9 items-center justify-center flex truncate font-semibold border ${
        seconds > 100 ? 'text-[.73rem]' : 'text-xs'
      }`}
    >
      {displayTimer}s
    </div>
  )
}
