import React, { memo, useCallback } from 'react'
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
      'Scan in progress, you will be notified if new issues occur.',
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
      <MoreOptionsBase {...props} index={index}>
        {typeof crawlWebsite === 'function' && !history ? (
          <MenuItem onClick={onWebsiteCrawl}>Scan</MenuItem>
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
        {typeof removePress === 'function' && !history ? (
          <MenuItem onClick={removePress} style={{ color: 'red' }}>
            Delete
          </MenuItem>
        ) : null}
      </MoreOptionsBase>
    </>
  )
}

export const MoreOptions = memo(MoreOptionsComponent)
