import { memo, useCallback } from 'react'
import { AppManager } from '@app/managers'
import { useWebsiteContext } from '@app/components/providers/website'
import { btnStyles, MoreOptionsBase, MoreOptionsProps } from './more-base'
import { Button } from '../../buttons'
import { Link } from '@app/app/typo/link'

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
          <Link
            className={btnStyles}
            style={{ color: '#10b981' }}
            href={'/payments'}
          >
            Upgrade
          </Link>
        ) : null}
        {typeof crawlWebsite === 'function' && !history ? (
          <Button onClick={onWebsiteCrawl} className={btnStyles}>
            Sync
          </Button>
        ) : null}
        {!history ? (
          <Button onClick={toggleLighthouse} className={btnStyles}>
            Toggle Lighthouse {pageInsights ? 'Off' : 'On'}
          </Button>
        ) : null}
        {!history ? (
          <Button
            className={btnStyles}
            onClick={handleMainClick(
              pageHeaders,
              'Custom Headers',
              false,
              url as string
            )}
          >
            Update Headers
          </Button>
        ) : null}
        {!verified ? (
          <Button
            className={btnStyles}
            onClick={handleMainClick(true, 'Verify DNS', false, url as string)}
          >
            Verify DNS
          </Button>
        ) : null}
        {typeof removePress === 'function' && !history ? (
          <Button onClick={removePress} className={btnStyles}>
            Delete
          </Button>
        ) : null}
      </MoreOptionsBase>
    </>
  )
}

export const MoreOptions = memo(MoreOptionsComponent)
