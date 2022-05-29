import React, { useRef } from 'react'
import {
  AppBar,
  Dialog,
  Toolbar,
  IconButton,
  Grow,
  List,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DragHandler } from '@app/lib'
import { useMiniPlayer } from '@app/data'
import { NavBarTitle } from './navigation'
import type { MergedTheme } from '@app/theme'
import { GrClose } from 'react-icons/gr'
import { issueExtractor } from '@app/utils'
import { FeedIssue } from './feed/issue'

const useStyles = makeStyles((theme: MergedTheme) => ({
  root: {
    overflowX: 'hidden',
  },
  appBar: {
    position: 'sticky',
    backgroundColor: '#000',
    color: '#fff',
  },
  miniPlayer: {
    overflowX: 'hidden',
    right: 'auto !important',
    left: 'auto',
    [theme.breakpoints.down('sm')]: {
      maxWidth: 350,
    },
  },
  list: {
    maxHeight: '50vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    display: 'block',
    zIndex: 2,
  },
  noMaxHeight: {
    maxHeight: 'none',
  },
  transparent: {
    background: 'inherit',
  },
}))

const GrowTransition = React.forwardRef(function GrowTransition(
  props: any,
  ref: any
) {
  return <Grow ref={ref} {...props} />
})

export function IssueModal({ issue }: any) {
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()
  const classes = useStyles()
  const appBarRef = useRef(null)
  const { open, title } = miniPlayer
  const handler = new DragHandler(appBarRef?.current)

  const onDragEvent = (e: any) => {
    handler.dragMouseDown(e, appBarRef?.current)
  }

  const pageIssues = issueExtractor(issue)

  return (
    <Dialog
      ref={appBarRef}
      className={classes.miniPlayer}
      open={open}
      onClose={setMiniPlayerContent(false)}
      TransitionComponent={GrowTransition as any}
      hideBackdrop={true}
      disablePortal={true}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      scroll={'body'}
      BackdropProps={{
        classes: {
          root: classes.transparent,
        },
      }}
    >
      <AppBar
        className={classes.appBar}
        position='fixed'
        onMouseDown={onDragEvent}
      >
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={setMiniPlayerContent(false)}
            aria-label='close'
          >
            <GrClose className='grIcon text-white' />
          </IconButton>
          <div
            className={`flex space-x-2 place-items-center place-content-between`}
          >
            <NavBarTitle title={title} flex />
            {issue?.pageUrl ? (
              <p className='line-clamp-1 text-white text-xl'>{issue.pageUrl}</p>
            ) : null}
          </div>
        </Toolbar>
      </AppBar>
      {pageIssues?.length ? (
        <List
          className={`${classes.list} ${
            pageIssues?.length === 1 ? classes.noMaxHeight : ''
          }`}
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
        </List>
      ) : null}
    </Dialog>
  )
}
