import React, { memo, useCallback, useMemo } from 'react'
import { IconButton, MenuItem } from '@material-ui/core'
import { MoreVert as MoreIcon } from '@material-ui/icons'
import { AppManager } from '@app/managers'
import { Link } from '../../link'
import { TopMenu } from '../../top-menu'
import { Website } from '@app/types'
import { useWebsiteContext } from '@app/components/providers/website'

interface MoreOptionsProps extends Partial<Website> {
  removePress(): void
  modalClick?(data: any): void
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
  history?: boolean
  anchorEl?: any
  handleMenu?: any
}

function MoreOptionsComponent({
  url,
  removePress,
  subDomains,
  issues,
  history,
  crawlWebsite,
  html,
  pageHeaders,
  index,
  // top props
  handleMainClick,
  modalClick,
  // TODO: use STATE to manage
  anchorEl,
  handleClose,
  handleMenu,
  pageInsights,
}: MoreOptionsProps) {
  const href = useMemo(
    () => (url ? `/website-details?websiteUrl=${encodeURIComponent(url)}` : ''),
    [url]
  )
  const { updateWebsite } = useWebsiteContext()

  const toggleLighthouse = async () => {
    try {
      await updateWebsite({ variables: { url, pageInsights: !pageInsights } })
    } catch (e) {
      console.error(e)
    }
  }

  const menuId = `menu-appbar${index}`

  const onWebsiteCrawl = useCallback(async () => {
    AppManager.toggleSnack(
      true,
      'Scan in progress, if new issues occur you will be alerted',
      'success'
    )

    if (crawlWebsite) {
      try {
        await crawlWebsite({
          variables: {
            url,
          },
        })
      } catch (e) {}
    }

    handleClose()
  }, [url, handleClose, crawlWebsite])

  return (
    <>
      <IconButton
        aria-label='account of current user'
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <MoreIcon />
      </IconButton>
      <TopMenu
        id={menuId}
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem component={Link} href={href} color='inherit'>
          View Website
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
              url as string
            )}
          >
            View Pages
          </MenuItem>
        ) : null}
        <MenuItem onClick={handleMainClick(url, 'Mini Player', true)}>
          View Website (Mini Player)
        </MenuItem>
        {typeof modalClick === 'function' && html ? (
          <MenuItem onClick={modalClick}>View Source</MenuItem>
        ) : null}
        {!history ? (
          <MenuItem onClick={toggleLighthouse}>
            Toggle Lighthouse {pageInsights ? 'Off' : 'On'}
          </MenuItem>
        ) : null}
        {!history ? (
          <MenuItem
            onClick={handleMainClick(
              pageHeaders,
              'Custom Headers',
              false,
              url as string
            )}
          >
            Update Headers
          </MenuItem>
        ) : null}
        {typeof crawlWebsite === 'function' ? (
          <MenuItem onClick={onWebsiteCrawl}>Scan</MenuItem>
        ) : null}
        {!!removePress && !history ? (
          <MenuItem onClick={removePress} style={{ color: 'red' }}>
            Delete
          </MenuItem>
        ) : null}
      </TopMenu>
    </>
  )
}

export const MoreOptions = memo(MoreOptionsComponent)
