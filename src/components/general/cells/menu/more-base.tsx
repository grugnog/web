import { memo, useMemo } from 'react'
import { Menu } from '@headlessui/react'
import { Link } from '@app/components/general/link'
import { TopMenu } from '@app/components/general/top-menu'
import type { Website } from '@app/types'

export const btnStyles =
  'px-3 py-3 block w-full text-left border-none rounded-none text-sm md:px-4 md:border-none hover:no-underline hover:opacity-70 hover:shadow-none'

export interface MoreOptionsProps extends Partial<Website> {
  removePress?(): void
  handleClose?(): void
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
  handleClose,
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
    <TopMenu id={menuId} onClose={handleClose}>
      <Menu.Item>
        {() => (
          <Link href={href} className={btnStyles}>
            View Sandbox
          </Link>
        )}
      </Menu.Item>
      {!historyPage ? (
        <Menu.Item>
          {() => (
            <Link href={reportHref} className={btnStyles}>
              View Report
            </Link>
          )}
        </Menu.Item>
      ) : null}
      {lh ? (
        <Menu.Item>
          {() => (
            <button
              className={btnStyles}
              onClick={handleMainClick(lh, 'Lighthouse', true)}
            >
              View Lighthouse
            </button>
          )}
        </Menu.Item>
      ) : null}
      {children}
    </TopMenu>
  )
}

export const MoreOptionsBase = memo(MoreOptionsBaseComponent)
