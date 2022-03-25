import React, {
  Fragment,
  memo,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react'
import { IconButton } from '@material-ui/core'
import {
  ExpandLess as ExpandLessIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { RenderIssuesList } from './render'

const useStyles = makeStyles(() => ({
  listTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
  },
}))

export function IssueFeedCellComponent({
  item,
  error = false,
  handleToggle,
  checked,
  checkList,
  listIndex,
  openError,
}: any) {
  const classes = useStyles()
  const [issueView, setIssueView] = useState<any>(error)

  const onToggleIssue = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e?.preventDefault()
      setIssueView(!issueView)
    },
    [setIssueView]
  )

  const pageIssues =
    (Array.isArray(item?.issues) ? item.issues : item?.issues?.issues) || []

  const mainUrl = item?.url || item?.pageUrl

  const issueProps = {
    error,
    checkList,
    handleToggle,
    checked,
    listIndex,
    openError,
    pageIssues,
    item,
  }

  return (
    <Fragment>
      <li
        className={
          'flex flex-1 place-items-center pl-3 py-1 border border-t-0 border-l-0 border-r-0'
        }
      >
        <span className={`${classes.listTitle} flex flex-1 text-lg`}>
          {mainUrl || item?.selector}
        </span>
        <IconButton
          aria-label='toggle item visibility'
          aria-controls='menu-appbar-item'
          onClick={onToggleIssue}
          color='inherit'
        >
          {issueView ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </li>
      {issueView ? <RenderIssuesList {...issueProps} /> : null}
    </Fragment>
  )
}

export const IssueFeedCell = memo(IssueFeedCellComponent)
