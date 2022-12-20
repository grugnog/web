import { useCallback, useMemo, useState } from 'react'
import { Link } from '../link'
import { RenderAvatar, RenderSecondary } from './render'
import { MoreOptions } from '@app/components/general/cells/menu/more'
import type { Website } from '@app/types'

interface WebsiteCellProps extends Partial<Website> {
  removePress(props: { variables: { url?: string | null } }): void
  handleClickOpen(a: any, b: any, c?: string): void
  handleClickOpenPlayer: (a: boolean, b: any, c?: string) => () => void
  mutatationLoading: boolean
}

// OLD WEBSITE CELL [TODO: remove]
export function WebsiteCell(props: WebsiteCellProps) {
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const { removePress, ...extra } = props

  const {
    url,
    handleClickOpen,
    issues,
    issuesInfo,
    cdnConnected,
    pageLoadTime,
    mutatationLoading,
    lastScanDate,
    pageHeaders,
  } = extra

  const { adaScore } = issuesInfo ?? {}

  const handleMenu = (event: any) => {
    setAnchorEl(event?.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onRemovePress = useCallback(() => {
    removePress({
      variables: {
        url,
      },
    })
  }, [url, removePress])

  const href = useMemo(
    () => (url ? `/website-details?url=${encodeURIComponent(url)}` : ''),
    [url]
  )

  const handleMainClick =
    (eventData?: any, title?: string, _mini?: boolean, url?: string) => () => {
      handleClickOpen(eventData, title, url)
      setAnchorEl(null)
    }

  return (
    <li
      className={'border-b space-y-1 flex w-full px-3 py-2 hover:no-underline'}
    >
      <RenderAvatar
        cdnConnected={cdnConnected}
        adaScore={adaScore}
        error={false}
      />
      <div className='space-y-2 flex flex-1 flex-col'>
        <Link href={href} className='text-lg'>
          {url}
        </Link>
        <RenderSecondary
          issuesInfo={issuesInfo}
          cdnConnected={cdnConnected}
          adaScore={adaScore}
          issues={issues}
          pageLoadTime={pageLoadTime}
          mutatationLoading={mutatationLoading}
          lastScanDate={lastScanDate}
          pageHeaders={pageHeaders}
        />
      </div>
      <div className='py-2'>
        <MoreOptions
          handleMainClick={handleMainClick}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleMenu={handleMenu}
          removePress={onRemovePress}
          {...extra}
        />
      </div>
    </li>
  )
}
