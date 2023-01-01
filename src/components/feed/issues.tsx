import { memo, FC, useDeferredValue, useCallback, useMemo } from 'react'
import { useWebsiteContext } from '../providers/website'
import { useWasmContext } from '../providers'
import type { Website } from '@app/types'
import { FeedTopSection } from './top'
import { alertIssueDifference } from '@app/utils/alerts'
import { DomainList } from './domain-list'

// side panel that appears fixed on the right of current issues of domain being. This returns a list of pages with a list of issues per page.
const LiveFeed: FC = () => {
  const { feed } = useWasmContext()
  const { feedOpen, setIssueFeedContent, singlePageScan, forceUpdate } =
    useWebsiteContext()
  const websites = useDeferredValue(feed?.get_data_keys() ?? [])

  const onScanEvent = useCallback(
    async (target: string) => {
      let webPage: Website | null = null
      const domain = new URL(target).hostname
      // the current item in the feed - wasm binds domain updates after
      const page = feed?.get_page(domain, target)

      try {
        webPage = await singlePageScan({ variables: { url: target } })
      } catch (e) {
        console.error(e)
      }

      // replace issue feed section with new value
      if (webPage && page) {
        alertIssueDifference({
          lastCount: page?.issues?.length || 0,
          nextCount: webPage?.issue?.length || 0,
        })
      }
    },
    [feed, singlePageScan]
  )

  const { mainStyle, topStyles } = useMemo(() => {
    const mobileStyles = feedOpen
      ? `h-full w-full z-20 overflow-y-auto`
      : 'max-h-[60px] bottom-0 rounded w-full lg:max-h-full lg:overflow-y-auto lg:rounded-none lg:h-full lg:bottom-0 lg:top-0 lg:pl-0 lg:z-20'

    const mainStyle = `${
      feedOpen ? 'z-20 ' : ''
    }border-t md:border-t-0 fixed lg:min-w-[24vw] lg:relative`

    const topStyles = `fixed bottom-0 bg-lightgray dark:bg-gray-900 gap-x-4 lg:w-[24vw] ${mobileStyles}`

    return {
      mainStyle,
      topStyles,
    }
  }, [feedOpen])

  const clearData = useCallback(() => {
    feed?.clear_data()
    forceUpdate()
  }, [feed, forceUpdate])

  return (
    <>
      {feedOpen ? <style>{`body { overflow: hidden; }`}</style> : null}
      <div className={mainStyle} aria-live='polite'>
        <div className={topStyles} id='live-feed'>
          <FeedTopSection
            onClick={setIssueFeedContent}
            open={feedOpen}
            clearFeed={clearData}
            feedExist={websites.length}
          />
          <DomainList
            websites={websites}
            onScanEvent={onScanEvent}
            feed={feed}
          />
        </div>
      </div>
    </>
  )
}

// authed application feed
export const IssueFeed = memo(LiveFeed)
