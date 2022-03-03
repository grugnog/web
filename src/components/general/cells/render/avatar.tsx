import React, { memo } from 'react'
import { Typography, Tooltip, ListItemAvatar, Avatar } from '@material-ui/core'
import {
  Folder as FolderIcon,
  Warning as WarningIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  adaScore: {
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    left: '1.5px',
    position: 'relative',
  },
  cdnText: {
    color: theme.palette.secondary.main,
    fontWeight: 800,
  },
  avatar: {
    backgroundColor: theme.palette.common.black,
  },
  pulse: {
    boxShadow: `2px 1.5px ${theme.palette.secondary.main}`,
    backgroundColor: 'rgb(211,211,211)',
    color: theme.palette.common.black,
  },
}))

export function RenderAvatarComponent({ adaScore, cdnConnected, error }: any) {
  const classes = useStyles()

  const newScore = adaScore && `${Math.max(0, adaScore.toFixed(0))}%`
  const ADASCORE = adaScore
    ? `Accessibility score ${newScore}`
    : 'Accessibility score not generated yet'

  const className = `${classes.avatar}${
    cdnConnected ? ` ${classes.pulse}` : ''
  }`

  let inner = <FolderIcon />
  if (adaScore) {
    inner = (
      <Typography
        aria-label={ADASCORE}
        className={`${classes.adaScore} ${cdnConnected ? classes.cdnText : ''}`}
      >
        {newScore}
      </Typography>
    )
  }
  if (error) {
    inner = <WarningIcon />
  }
  return (
    <Tooltip
      title={`${ADASCORE} ${cdnConnected ? '- A11y CDN Connected' : ''}`}
      placement={'left'}
    >
      <ListItemAvatar>
        <Avatar className={className}>{inner}</Avatar>
      </ListItemAvatar>
    </Tooltip>
  )
}

export const RenderAvatar = memo(RenderAvatarComponent)
