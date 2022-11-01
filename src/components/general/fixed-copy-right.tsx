import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { companyName } from '@app/configs'

const useStyles = makeStyles((theme) => ({
  sticky: {
    alignSelf: 'center',
    fontSize: '13px',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      fontSize: '10px',
    },
  },
  stickContainer: {
    alignSelf: 'center',
    fontSize: '13px',
    color: theme.palette.text.primary,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  stick: {
    position: 'fixed',
    bottom: 0,
    width: '250px',
    paddingBottom: '8px',
    paddingTop: '8px',
    backgroundColor: 'inherit',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}))

interface Props {
  sticky?: boolean
}

function FixedCopyRight({ sticky }: Props) {
  const classes = useStyles()

  const cc = `© ${new Date().getFullYear()} ${companyName}, LLC`

  if (!sticky) {
    return <span className={!sticky ? 'text-sm pb-3' : 'text-sm'}>{cc}</span>
  }

  return (
    <div className={`${classes.stickContainer} ${sticky ? classes.stick : ''}`}>
      <div className={classes.sticky}>
        <span className={!sticky ? 'text-sm pb-3' : 'text-sm'}>{cc}</span>
      </div>
    </div>
  )
}

export { FixedCopyRight }
