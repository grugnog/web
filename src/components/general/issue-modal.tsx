import { useRef } from 'react'
import { Dialog } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMiniPlayer } from '@app/data'
import { NavBarTitle } from './navigation'
import type { MergedTheme } from '@app/theme'
import { GrClose } from 'react-icons/gr'
import { issueExtractor } from '@app/utils'
import { FeedIssue } from './feed/issue'
import Draggable from 'react-draggable'
import { Button } from './buttons'

const useStyles = makeStyles((theme: MergedTheme) => ({
  miniPlayer: {
    overflowX: 'hidden',
    right: 'auto !important',
    left: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 350,
    },
  },
  noMaxHeight: {
    maxHeight: 'none',
  },
}))

export function IssueModal({ issue }: any) {
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()
  const classes = useStyles()
  const appBarRef = useRef(null)
  const { open, title } = miniPlayer

  const pageIssues = issueExtractor(issue)

  return (
    <Draggable allowAnyClick={false} handle={'.appBar'}>
      <Dialog
        ref={appBarRef}
        className={classes.miniPlayer}
        open={open}
        onClose={setMiniPlayerContent(false)}
        hideBackdrop={true}
        disablePortal={true}
        disableEnforceFocus={true}
        disableAutoFocus={true}
        scroll={'body'}
      >
        <div className={`appBar text-white bg-black`}>
          <div className='flex place-items-center py-2 px-2'>
            <Button
              onClick={setMiniPlayerContent(false)}
              aria-label='close'
              iconButton
              className='text-white hover:text-black'
            >
              <GrClose className='grIcon' />
            </Button>
            <div
              className={`flex space-x-2 place-items-center place-content-between`}
            >
              <NavBarTitle title={title} flex />
              {issue?.pageUrl ? (
                <p className='line-clamp-1 text-white text-xl'>
                  {issue.pageUrl}
                </p>
              ) : null}
            </div>
          </div>
        </div>
        {pageIssues?.length ? (
          <ul
            className={`max-h-[50vh] ${
              pageIssues?.length === 1 ? classes.noMaxHeight : ''
            } list-none`}
          >
            {pageIssues?.map((item: any) => {
              return (
                <FeedIssue
                  {...item}
                  url={issue?.pageUrl}
                  key={`${item?.selector}-${item?.code}`}
                />
              )
            })}
          </ul>
        ) : null}
      </Dialog>
    </Draggable>
  )
}
