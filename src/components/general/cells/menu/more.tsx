import { memo, useCallback } from 'react'
import { useWebsiteContext } from '@app/components/providers/website'
import { btnStyles, MoreOptionsBase, MoreOptionsProps } from './more-base'
import { Link } from '@app/components/stateless/typo/link'
import { Menu } from '@headlessui/react'
import { useAuthContext } from '@app/components/providers/auth'
import { GrLock } from 'react-icons/gr'
import { classNames } from '@app/utils/classes'

function MoreOptionsComponent(props: MoreOptionsProps) {
  const { updateWebsite } = useWebsiteContext()
  const { account } = useAuthContext()
  const {
    url,
    removePress,
    historyPage,
    crawlWebsite,
    pageHeaders,
    index,
    handleMainClick,
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

  return (
    <MoreOptionsBase {...props} index={index}>
      {!historyPage ? (
        <>
          <Menu.Item>
            {() => (
              <button
                className={`${btnStyles}${
                  !account.activeSubscription
                    ? ' flex place-items-center gap-x-2 opacity-90'
                    : ''
                }`}
                disabled={!account.activeSubscription}
                onClick={handleMainClick(
                  true,
                  'Website Analytics',
                  false,
                  url as string
                )}
              >
                View Analytics
                {!account.activeSubscription ? (
                  <GrLock className='grIcon' />
                ) : (
                  ''
                )}
              </button>
            )}
          </Menu.Item>
          {typeof crawlWebsite === 'function' ? (
            <Menu.Item>
              {() => (
                <button onClick={crawlWebsite} className={btnStyles}>
                  Sync
                </button>
              )}
            </Menu.Item>
          ) : null}
          <Menu.Item>
            {() => (
              <button onClick={toggleLighthouse} className={btnStyles}>
                Toggle Lighthouse {pageInsights ? 'Off' : 'On'}
              </button>
            )}
          </Menu.Item>
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
        </>
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
      {shutdown ? (
        <Menu.Item>
          {() => (
            <Link
              className={classNames(btnStyles, 'text-green-700')}
              href={'/payments'}
            >
              Upgrade
            </Link>
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
  )
}

export const MoreOptions = memo(MoreOptionsComponent)
