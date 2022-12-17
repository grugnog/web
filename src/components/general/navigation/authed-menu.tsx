'use client'

import { memo, SyntheticEvent } from 'react'
import { useFeaturesData, useEvents } from '@app/data'
import { features } from '@app/configs'
import { FeaturesCell } from '../cells'
import { UserManager } from '@app/managers'
import { useAuthContext } from '@app/components/providers/auth'

type AuthedMenuProps = {
  route?: string
  isMobile?: boolean
  dataSourceMap?: any
  loading?: boolean
}

// Side menu that appears on application routes
export function AuthedMenuComponent({ route, loading }: AuthedMenuProps) {
  const { events, setEvents } = useEvents()
  const { toggleAlert } = useFeaturesData()
  const { account, setAccountType } = useAuthContext()
  const { alertEnabled, inited, activeSubscription } = account

  // initial page load show skeleton [first load state]
  const initialLoad = loading && !inited

  const onAlertToggle = async (e?: SyntheticEvent<HTMLInputElement>) => {
    if (e && typeof e.stopPropagation === 'function') {
      e?.stopPropagation()
    }

    try {
      const nextValue = !alertEnabled
      setAccountType({
        authed: account.authed,
        activeSubscription,
        alertEnabled: nextValue,
        inited: true,
      })
      // todo: remove local storage usage for network + memory
      UserManager.setAlertsEnabled(nextValue)
      await toggleAlert({
        variables: {
          alertEnabled: nextValue,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <nav>
      <ul className='list-none py-2'>
        {features.map(({ feature }: any, index: number) => (
          <FeaturesCell
            key={index}
            alertEnabled={alertEnabled}
            feature={feature}
            index={index}
            focused={route?.includes(feature)} // use page meta TODO
            events={events}
            setEvents={setEvents}
            toggleAlert={onAlertToggle}
            initialLoad={initialLoad}
            activeSubscription={activeSubscription}
          />
        ))}
      </ul>
    </nav>
  )
}

export const AuthedMenu = memo(AuthedMenuComponent)
