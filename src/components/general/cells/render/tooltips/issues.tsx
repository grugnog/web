import React, { memo } from 'react'
import { Chip, Tooltip } from '@material-ui/core'
import { Error as IssuesIcon } from '@material-ui/icons'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import type { MergedTheme } from '@app/theme'

const useStyles = makeStyles(({ breakpoints }: MergedTheme) =>
  createStyles({
    adjust: {
      marginRight: '8px',
      [breakpoints.down('sm')]: {
        marginRight: '5px',
      },
    },
  })
)

interface TooltipIssuesProps {
  totalIssues: number
  totalPageIssues: number
}

export function TooltipIssuesComponent({
  totalPageIssues,
  totalIssues,
}: TooltipIssuesProps) {
  const classes = useStyles()

  if (!totalIssues) {
    return null
  }

  return (
    <Tooltip
      title={`${totalIssues} issue${
        totalIssues === 1 ? '' : 's'
      } across ${totalPageIssues} page${
        totalPageIssues === 1 || !totalPageIssues ? '' : 's'
      }`}
      placement={'right'}
    >
      <Chip
        className={classes.adjust}
        variant='outlined'
        size='small'
        avatar={<IssuesIcon />}
        label={`${totalIssues} issue${totalIssues === 1 ? '' : 's'}`}
      />
    </Tooltip>
  )
}

export const TooltipIssues = memo(TooltipIssuesComponent)
