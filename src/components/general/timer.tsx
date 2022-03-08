import React, { useState, useEffect } from 'react'
import { Typography } from '@material-ui/core'

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
    <Typography
      gutterBottom
      variant={'subtitle1'}
      style={{
        color: seconds > 20 ? '#FF0000' : seconds > 10 ? '#FFFF00' : 'inherit',
      }}
    >
      Scan time: {seconds}s
    </Typography>
  )
}
