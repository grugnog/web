import { useState, memo, useEffect } from 'react'
import { hiddenList, visibleList } from '@app/stylesheets/list.module.css'
import { Pages } from '@app/types'
import { ListCellAnalyticsHeader } from './analytics-header'
import { FetchIssue } from './fetch-issue'
import { Skeleton } from '@app/components/placeholders/skeleton'

// return issues maped
const PagesWrapper = ({
  errorCount,
  warningCount,
  totalIssues,
  domain,
  url,
  open: defaultOpen,
}: Pages & { open?: boolean; small?: boolean; singleRow?: boolean }) => {
  const [visible, setVisible] = useState<boolean>(!!defaultOpen)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true)
    }
  }, [visible, loaded, setLoaded])

  return (
    <>
      <ListCellAnalyticsHeader
        url={url}
        totalIssues={totalIssues}
        setVisible={setVisible}
        visible={visible}
        warningCount={warningCount}
        errorCount={errorCount}
        domain={domain as string}
      />
      <div
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b ${
          visible ? visibleList : hiddenList
        }`}
      >
        {loaded ? (
          <FetchIssue url={url} />
        ) : (
          <Skeleton className='w-full h-30' />
        )}
      </div>
    </>
  )
}

// memo expensive issues
export const PagesList = memo(PagesWrapper)
