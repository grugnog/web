import { memo, useMemo } from 'react'
import { GrMoreVertical } from 'react-icons/gr'
import { Link } from '@app/components/general/link'
import { TopMenu } from '@app/components/general/top-menu'
import type { Website } from '@app/types'
import { Button } from '../../buttons'

export const btnStyles =
  'px-3 py-2 block w-full text-left border-none rounded-none text-base md:px-4 md:text-base md:border-none hover:no-underline hover:bg-gray-100 hover:shadow-none'

export interface MoreOptionsProps extends Partial<Website> {
  removePress?(): void
  handleClose(): void
  handleMainClick: (
    data: any,
    title: string,
    navigate?: boolean,
    url?: string
  ) => () => void
  crawlWebsite?(data: any): Promise<void>
  index?: number
  pageHeaders?: any
  historyPage?: boolean // is this a history page?
  anchorEl?: any
  handleMenu?: any
  lh?: any // lighthouse data render as modal
  children?: any
  url?: string // base url or domain
  pageUrl?: string // main target for page
}

// Base of more options ...
function MoreOptionsBaseComponent({
  pageUrl,
  url,
  index,
  lh,
  children,
  // events
  handleMainClick,
  anchorEl,
  handleClose,
  handleMenu,
  historyPage,
}: MoreOptionsProps) {
  const targetUrl = pageUrl || url

  const [href, reportHref] = useMemo(() => {
    const link = targetUrl
      ? `/website-details?url=${encodeURIComponent(targetUrl)}`
      : ''
    const report = targetUrl ? `/reports/${encodeURIComponent(targetUrl)}` : ''
    return [link, report]
  }, [targetUrl])

  const menuId = `menu-appbar${index}`

  return (
    <>
      <Button
        aria-label='account of current user'
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenu}
        iconButton
      >
        <GrMoreVertical />
      </Button>
      <TopMenu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <Link href={href} className={btnStyles}>
          View Sandbox
        </Link>
        {!historyPage ? (
          <Link href={reportHref} className={btnStyles}>
            View Report
          </Link>
        ) : null}
        {lh ? (
          <button
            className={btnStyles}
            onClick={handleMainClick(JSON.stringify(lh), 'Lighthouse', true)}
          >
            View Lighthouse
          </button>
        ) : null}
        <Button
          onClick={handleMainClick(targetUrl, 'Mini Player', true)}
          className={btnStyles}
        >
          View Sandbox (Mini Player)
        </Button>
        {children}
      </TopMenu>
    </>
  )
}

export const MoreOptionsBase = memo(MoreOptionsBaseComponent)
