import { memo, useCallback } from 'react'
import { MenuItem } from '@material-ui/core'
import { AppManager } from '@app/managers'
import { useWebsiteContext } from '@app/components/providers/website'
import { MoreOptionsBase, MoreOptionsProps } from './more-base'

function MoreOptionsComponent(props: MoreOptionsProps) {
  const { updateWebsite } = useWebsiteContext()

  const {
    url,
    removePress,
    history,
    crawlWebsite,
    pageHeaders,
    index,
    handleMainClick,
    handleClose,
    pageInsights,
    shutdown,
    verified,
  } = props

  const toggleLighthouse = useCallback(async () => {
    try {
      await updateWebsite({ variables: { url, pageInsights: !pageInsights } })
    } catch (e) {
      console.error(e)
    }
  }, [updateWebsite, url, pageInsights])

  const onWebsiteCrawl = useCallback(async () => {
    AppManager.toggleSnack(
      true,
      `Scan in progress, you’ll be notified if new issues occur.`,
      'message'
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
      <MoreOptionsBase {...props} index={index}>
        {shutdown ? (
          <MenuItem
            style={{ color: '#10b981' }}
            component={'a'}
            href={'/payments'}
          >
            Upgrade
          </MenuItem>
        ) : null}
        {typeof crawlWebsite === 'function' && !history ? (
          <MenuItem onClick={onWebsiteCrawl}>Sync</MenuItem>
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
        {!verified ? (
          <MenuItem
            onClick={handleMainClick(true, 'Verify DNS', false, url as string)}
          >
            Verify DNS
          </MenuItem>
        ) : null}
        {typeof removePress === 'function' && !history ? (
          <MenuItem onClick={removePress}>Delete</MenuItem>
        ) : null}
      </MoreOptionsBase>
    </>
  )
}

export const MoreOptions = memo(MoreOptionsComponent)
