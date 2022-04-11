import React, { memo, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IssueList, WebsiteTabs, TestView } from '@app/components/general'
import { ListSkeleton } from '@app/components/placeholders'
import { ReportViewComponentLeft } from './report-left'
import { Website } from '@app/types'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 48,
    ['& > li > *']: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: 160,
    ['& > li > *']: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
    },
  },
  title: {
    flex: 1,
    fontWeight: 600,
    maxWidth: '95vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: 6,
    paddingLeft: 6,
  },
  block: {
    flex: 1,
    display: 'block',
    height: '100%',
  },
}))

export function ReportEmptyView() {
  const classes = useStyles()

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.loading} role='presentation'>
        <ListSkeleton avatar={false} subTitle={false} count={3} />
      </div>
      <div className={classes.toolbar} role='presentation'>
        <ListSkeleton avatar={false} subTitle={false} count={2} />
      </div>
      <ListSkeleton count={8} avatar={false} report />
    </div>
  )
}
export function ReportBody({ website }: { website: Website }) {
  return <IssueList website={website} printable />
}

export function ReportInner({
  website,
  disablePlayground,
  disableTabs,
}: {
  disablePlayground?: boolean
  website: Website
  disableTabs?: boolean
}) {
  if (disableTabs) {
    return <ReportBody website={website} />
  }

  return (
    <WebsiteTabs
      issues={<IssueList website={website} printable />}
      playground={
        disablePlayground ? null : (
          <TestView url={website.url || ''} marketing />
        )
      }
    />
  )
}

export function ReportViewComponent({
  website,
  closeButton,
  disablePlayground,
  disableTabs,
}: any) {
  const classes = useStyles()
  const empty = useMemo(() => Object.keys(website ?? {}).length <= 1, [website])

  return (
    <div className={classes.root}>
      <ReportViewComponentLeft
        website={website}
        closeButton={closeButton}
        printable
      />
      {empty ? (
        <ReportEmptyView />
      ) : (
        <ReportInner
          website={website}
          disablePlayground={disablePlayground}
          disableTabs={disableTabs}
        />
      )}
    </div>
  )
}

export const ReportView = memo(ReportViewComponent)
