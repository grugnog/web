import React, { useState, useEffect } from 'react'
import { Tooltip } from '@material-ui/core'

export const Timer = ({ stop }: { stop?: boolean }) => {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1)
    }, 1000)
    if (stop) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [stop])

  const style = {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    color: 'rgba(0, 0, 0, 0.7)',
  }

  return (
    <Tooltip title={`Scan duration ${seconds} seconds`} placement={'right'}>
      <div
        className='rounded-3xl p-1 w-9 h-9 items-center justify-center flex truncate'
        style={style}
      >
        <p className='font-small'>{seconds}s</p>
      </div>
    </Tooltip>
  )
}
