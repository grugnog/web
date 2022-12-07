import { memo, useMemo } from 'react'
import { IconButton, MenuItem } from '@material-ui/core'
import { GrMoreVertical } from 'react-icons/gr'
import { NextComposed } from '@app/components/general/link'
import { TopMenu } from '@app/components/general/top-menu'
import type { Website } from '@app/types'
import { issueExtractor } from '@app/utils'

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
  url?: string // base url or domain
  pageUrl?: string // main target for page
}

// Base of more options ...
function MoreOptionsBaseComponent({
  pageUrl,
  url,
  issues: pageIssues,
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
    const link = targetUrl
      ? `/website-details?url=${encodeURIComponent(targetUrl)}`
      : ''
    const report = targetUrl ? `/reports/${encodeURIComponent(targetUrl)}` : ''
    return [link, report]
  }, [targetUrl])

  const menuId = `menu-appbar${index}`

  const issues = issueExtractor(pageIssues)

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
            onClick={handleMainClick(
              issues,
              'Issues',
              false,
              targetUrl as string
            )}
          >
            View Issues
          </MenuItem>
        ) : null}
        {lh ? (
          <MenuItem
            onClick={handleMainClick(JSON.stringify(lh), 'Lighthouse', true)}
          >
            View Lighthouse
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(targetUrl, 'Mini Player', true)}>
          View Sandbox (Mini Player)
        </MenuItem>
        {children}
      </TopMenu>
    </>
  )
}

export const MoreOptionsBase = memo(MoreOptionsBaseComponent)
