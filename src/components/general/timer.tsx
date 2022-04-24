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

  return (
    <Tooltip title={`Scan duration ${seconds} seconds`} placement={'right'}>
      <div className='border rounded-3xl p-1 w-9 h-9 items-center justify-center flex truncate'>
        <p className='font-small'>{seconds}s</p>
      </div>
    </Tooltip>
  )
}
