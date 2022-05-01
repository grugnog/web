import React, { memo, useMemo } from 'react'
import { IconButton, MenuItem } from '@material-ui/core'
import { GrMoreVertical } from 'react-icons/gr'
import { codecs } from '@a11ywatch/website-source-builder'
import { NextComposed } from '@app/components/general/link'
import { TopMenu } from '@app/components/general/top-menu'
import type { Website } from '@app/types'

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
  history?: boolean // is this a history page?
  anchorEl?: any
  handleMenu?: any
  lh?: any // lighthouse data render as modal
  children?: any
  url?: string | null // base url or domain
  pageUrl?: string | null // main target for page
}

// Base of more options ...
function MoreOptionsBaseComponent({
  pageUrl,
  url,
  subDomains,
  issues,
  index,
  lh,
  children,
  // events
  handleMainClick,
  anchorEl,
  handleClose,
  handleMenu,
}: MoreOptionsProps) {
  const targetUrl = pageUrl || url

  const [href, reportHref] = useMemo(() => {
    const link = targetUrl ? `/website-details?url=${encodeURI(targetUrl)}` : ''
    const report = targetUrl ? `/reports/${codecs.cipher(targetUrl)}` : ''
    return [link, report]
  }, [targetUrl])

  const menuId = `menu-appbar${index}`

  return (
    <>
      <IconButton
        aria-label='account of current user'
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenu}
      >
        <GrMoreVertical />
      </IconButton>
      <TopMenu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem component={NextComposed as any} href={href}>
          View Sandbox
        </MenuItem>
        <MenuItem component={NextComposed as any} href={reportHref}>
          View Report
        </MenuItem>
        {issues?.length ? (
          <MenuItem
            onClick={handleMainClick(issues, 'Issues', false, url as string)}
          >
            View Issues
          </MenuItem>
        ) : null}
        {subDomains?.length ? (
          <MenuItem
            onClick={handleMainClick(
              subDomains,
              'All Pages',
              false,
              targetUrl as string
            )}
          >
            View Pages
          </MenuItem>
        ) : null}
        {lh ? (
          <MenuItem onClick={handleMainClick(lh, 'Lighthouse', true)}>
            View Lighthouse
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
          View Sandbox (Mini Player)
        </MenuItem>
        {/* {typeof crawlWebsite === 'function' ? (
          <MenuItem onClick={onWebsiteCrawl}>Scan</MenuItem>
        ) : null} */}
        {children}
      </TopMenu>
    </>
  )
}

export const MoreOptionsBase = memo(MoreOptionsBaseComponent)
