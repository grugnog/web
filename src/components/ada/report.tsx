import { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { WebsiteTabs, TestView } from '@app/components/general'
import { ListSkeleton } from '@app/components/placeholders'
import { ReportViewLeft } from './report-left'
import { Website } from '@app/types'
import dynamic from 'next/dynamic'

const TestViewRest = dynamic(
  () =>
    import('../general/test-view-rest').then((mod) => mod.TestViewRest) as any,
  { ssr: false, loading: () => <div>Loading playground...</div> }
) as any

const FeedList = dynamic(
  () => import('../feed/list').then((mod) => mod.FeedList) as any,
  {
    ssr: false,
    loading: () => (
      <div className='flex place-items-center p-4'>
        Loading report details...
      </div>
    ),
  }
) as any

const useStyles = makeStyles(() => ({
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
}))

function ReportEmptyView() {
  const classes = useStyles()

  return (
    <div className={'w-full'}>
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

function ReportInner({
  website,
  disablePlayground,
  disableTabs,
  viewMode,
}: {
  disablePlayground?: boolean
  website: Website
  disableTabs?: boolean
  viewMode?: 'playground' | 'list'
}) {
  // no tabs rendered
  if (disableTabs) {
    if (viewMode === 'playground') {
      return (
        <TestViewRest
          url={website.url || ''}
          marketing
          posRelative
          website={website}
        />
      )
    }
    return <FeedList issue={website as any} isHidden={false} fullScreen />
  }

  return (
    <WebsiteTabs
      issues={<FeedList issue={website as any} isHidden={false} fullScreen />}
      playground={
        disablePlayground ? null : (
          <TestView url={website.url || ''} marketing posRelative />
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
  download,
  authenticated,
}: any) {
  const [leftViewMode, setViewMode] = useState<'list' | 'playground'>(
    'playground'
  )
  const onToggleViewModeEvent = () =>
    setViewMode((mode: string) =>
      mode === 'playground' ? 'list' : 'playground'
    )

  const empty = !('domain' in website && 'url' in website)

  return (
    <div className={`block sm:flex h-[100vh] overflow-hidden border-t`}>
      <div className='border-r'>
        <ReportViewLeft
          website={website}
          closeButton={closeButton}
          printable
          download={download}
          authenticated={authenticated}
          viewMode={leftViewMode}
          onToggleViewModeEvent={onToggleViewModeEvent}
        />
      </div>
      {empty ? (
        <ReportEmptyView />
      ) : (
        <ReportInner
          website={website}
          disablePlayground={disablePlayground}
          disableTabs={disableTabs}
          viewMode={leftViewMode === 'playground' ? 'list' : 'playground'}
        />
      )}
    </div>
  )
}

export const ReportView = memo(ReportViewComponent)
