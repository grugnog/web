import React from 'react'
import { Button } from '@a11ywatch/ui'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '-3rem',
    left: '15%',
    '&:focus': {
      top: 12,
      zIndex: 99999,
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}))

export const SkipContent = () => {
  const classes = useStyles()

  return (
    <Button
      ariaLabel='Skip navigation'
      className={`${classes.root} invisible md:visible`}
      onClick={() => {
        document
          ?.querySelector('main')
          ?.querySelector('button, a, input, select, textarea')
          // @ts-ignore
          ?.focus()
      }}
    >
      SKIP NAVIGATION
    </Button>
  )
}
