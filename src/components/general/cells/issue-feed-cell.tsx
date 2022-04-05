import React, {
  Fragment,
  memo,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react'
import { IconButton } from '@material-ui/core'
import { FeedIssuesList } from './render/issues-list'
import { GrDown, GrUp } from 'react-icons/gr'

export function IssueFeedCellComponent({ item, handleToggle, listIndex }: any) {
  const [issueView, setIssueView] = useState<boolean>(true)

  const onToggleIssue = useCallback(
    (e: SyntheticEvent<HTMLButtonElement>) => {
      e?.preventDefault()
      setIssueView((v) => !v)
    },
    [setIssueView]
  )

  const pageIssues =
    (Array.isArray(item?.issues) ? item.issues : item?.issues?.issues) || []

  const mainUrl = item?.url || item?.pageUrl

  const issueProps = {
    handleToggle,
    listIndex,
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
        <span
          className={`flex-1 overflow-hidden text-ellipsis flex flex-1 text-lg`}
        >
          {mainUrl || item?.selector}
        </span>
        <IconButton
          aria-label='toggle item visibility'
          aria-controls='menu-appbar-item'
          onClick={onToggleIssue}
          color='inherit'
        >
          {issueView ? <GrUp /> : <GrDown />}
        </IconButton>
      </li>
      {issueView ? <FeedIssuesList {...issueProps} /> : null}
    </Fragment>
  )
}

export const IssueFeedCell = memo(IssueFeedCellComponent)
