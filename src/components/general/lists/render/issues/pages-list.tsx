import { useState, memo, useEffect } from 'react'
import { hiddenList, visibleList } from '@app/stylesheets/list.module.css'
import { Pages } from '@app/types'
import { ListCellPagesHeader } from './pages-header'
import { FetchIssue } from './fetch-issue'
import { Skeleton } from '@app/components/placeholders/skeleton'

// return issues maped
const PagesWrapper = ({
  handleMainClick,
  domain,
  url,
  open: defaultOpen,
  pageUrl,
  pageInsights,
  online,
  pageLoadTime,
}: Pages & {
  open?: boolean
  small?: boolean
  singleRow?: boolean
  handleMainClick?(ata: any, name: string, _mini: boolean, url: string): void
}) => {
  const [visible, setVisible] = useState<boolean>(!!defaultOpen)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (visible && !loaded) {
      setLoaded(true)
    }
  }, [visible, loaded, setLoaded])

  return (
    <>
      <ListCellPagesHeader
        url={url || pageUrl}
        setVisible={setVisible}
        visible={visible}
        domain={domain as string}
        online={online}
        pageInsights={pageInsights}
        duration={pageLoadTime?.duration}
        handleMainClick={handleMainClick}
      />
      <div
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b ${
          visible ? visibleList : hiddenList
        }`}
      >
        {loaded ? (
          <FetchIssue url={url || pageUrl} />
        ) : (
          <Skeleton className='w-full h-30' />
        )}
      </div>
    </>
  )
}

// memo expensive issues
export const PagesList = memo(PagesWrapper)
