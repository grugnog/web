import { useState, memo, useEffect } from 'react'
import { hiddenList, visibleList } from '@app/stylesheets/list.module.css'
import { Analytic } from '@app/types'
import { ListCellHeader } from './cell-header'
import { FetchIssue } from './fetch-issue'
import { Skeleton } from '@app/components/placeholders/skeleton'

// return issues maped
const AnalyticsWrapper = ({
  //   issues,
  //   errorCount,
  totalIssues,
  pageUrl,
  open,
  small,
  singleRow,
}: Analytic & { open?: boolean; small?: boolean; singleRow?: boolean }) => {
  const [visible, setVisible] = useState<boolean>(!!open)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true)
    }
  }, [visible, loaded, setLoaded])

  return (
    <div>
      <ListCellHeader
        title={pageUrl}
        totalIssues={totalIssues}
        setVisible={setVisible}
        visible={visible}
        small={small}
        singleRow={singleRow}
      />
      <ul
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b ${
          visible ? visibleList : hiddenList
        }`}
      >
        {loaded ? (
          <FetchIssue url={pageUrl} />
        ) : (
          <Skeleton className='w-full h-30' />
        )}
      </ul>
    </div>
  )
}

// memo expensive issues
export const AnalyticsList = memo(AnalyticsWrapper)
