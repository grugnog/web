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
    <Typography variant={'subtitle1'}>Scan duration: {seconds}s</Typography>
  )
}
