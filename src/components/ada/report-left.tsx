import { memo } from 'react'
import { Grid } from '@material-ui/core'
import { Spacer, Timer, TestViewRest } from '@app/components/general'
import { CtaCdn } from '@app/components/cta'
import { strings } from '@app-strings'
import { InfoBar } from './info-bar'
import { WebsiteSecondary } from '../general/cells/render/website-secondary'
import { FeedList } from '../feed/list'
import { Website } from '@app/types'

// container view for report or frame
const MainView = ({
  website,
  viewMode,
}: {
  website: Website
  viewMode: 'list' | ''
}) => {
  if (website?.url) {
    if (viewMode && viewMode === 'list') {
      // todo: remove any
      return <FeedList issue={website as any} isHidden={false} fullScreen />
    }
    return (
      <TestViewRest
        url={website.url || ''}
        marketing
        posRelative
        website={website}
      />
    )
  }

  return null
}

export function ReportViewComponentLeft({
  website = {},
  closeButton,
  disablePlayground,
  printable,
  download,
  authenticated,
  viewMode,
  onToggleViewModeEvent,
}: any) {
  const empty = !('domain' in website && 'url' in website)

  return (
    <div className={'p-1 md:w-[38vw]'}>
      <Grid className={`flex place-items-center pb-4 space-x-2`}>
        {closeButton}
        <p className={'flex-1 font-semibold truncate max-w-[94vw] text-xl'}>
          {website?.url || strings.trySearch}
        </p>
      </Grid>
      <div className='flex space-x-2 place-items-center'>
        <Timer stop={!empty} duration={website?.crawlDuration} />
        <div className='max-w-[85%]'>
          {empty ? null : <WebsiteSecondary {...website} pageIssueCount={1} />}
        </div>
      </div>
      <CtaCdn
        website={website}
        disablePlayground={disablePlayground}
        authenticated={authenticated}
      />
      <Spacer />
      <InfoBar
        website={website}
        printable={printable}
        download={authenticated && download}
        onToggleViewModeEvent={onToggleViewModeEvent}
      />
      {empty ? null : (
        <div className='hidden md:block'>
          <MainView website={website} viewMode={viewMode} />
        </div>
      )}
    </div>
  )
}

export const ReportViewLeft = memo(ReportViewComponentLeft)
