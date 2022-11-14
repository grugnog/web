import { useState, useEffect } from 'react'
import { Tooltip } from '@material-ui/core'

const style = {
  backgroundColor: '#fff',
  color: 'rgba(0, 0, 0, 0.7)',
  border: '1px solid rgb(209 213 219)',
}

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

  const secs = seconds.toFixed(0)
  const defaultDuration = duration ? Number(duration / 1000).toFixed(0) : 0

  const displayTimer = seconds ? secs : defaultDuration
  const displayTip = defaultDuration ? 'Site-wide crawl' : 'Scan'

  return (
    <Tooltip
      title={`${displayTip} duration ${displayTimer} seconds`}
      placement={'right'}
    >
      <div
        className='rounded-3xl p-1 w-9 h-9 items-center justify-center flex truncate font-semibold'
        style={style}
      >
        <p className='text-xs'>{displayTimer}s</p>
      </div>
    </Tooltip>
  )
}
