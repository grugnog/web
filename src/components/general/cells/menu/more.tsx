import { memo, useCallback } from 'react'
import { AppManager } from '@app/managers'
import { useWebsiteContext } from '@app/components/providers/website'
import { btnStyles, MoreOptionsBase, MoreOptionsProps } from './more-base'
import { Link } from '@app/components/stateless/typo/link'
import { Menu } from '@headlessui/react'

function MoreOptionsComponent(props: MoreOptionsProps) {
  const { updateWebsite } = useWebsiteContext()

  const {
    url,
    removePress,
    historyPage,
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
          <Menu.Item>
            {() => (
              <Link
                className={btnStyles}
                style={{ color: '#10b981' }}
                href={'/payments'}
              >
                Upgrade
              </Link>
            )}
          </Menu.Item>
        ) : null}
        {typeof crawlWebsite === 'function' && !historyPage ? (
          <Menu.Item>
            {() => (
              <button onClick={onWebsiteCrawl} className={btnStyles}>
                Sync
              </button>
            )}
          </Menu.Item>
        ) : null}
        {!historyPage ? (
          <Menu.Item>
            {() => (
              <button onClick={toggleLighthouse} className={btnStyles}>
                Toggle Lighthouse {pageInsights ? 'Off' : 'On'}
              </button>
            )}
          </Menu.Item>
        ) : null}
        {!historyPage ? (
          <Menu.Item>
            {() => (
              <button
                className={btnStyles}
                onClick={handleMainClick(
                  pageHeaders,
                  'Custom Headers',
                  false,
                  url as string
                )}
              >
                Update Headers
              </button>
            )}
          </Menu.Item>
        ) : null}
        {!verified && !historyPage ? (
          <Menu.Item>
            {() => (
              <button
                className={btnStyles}
                onClick={handleMainClick(
                  true,
                  'Verify DNS',
                  false,
                  url as string
                )}
              >
                Verify DNS
              </button>
            )}
          </Menu.Item>
        ) : null}
        {typeof removePress === 'function' && !historyPage ? (
          <div className='border-t'>
            <Menu.Item>
              {() => (
                <button
                  onClick={removePress}
                  className={`${btnStyles} text-red-700`}
                >
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        ) : null}
      </MoreOptionsBase>
    </>
  )
}

export const MoreOptions = memo(MoreOptionsComponent)
