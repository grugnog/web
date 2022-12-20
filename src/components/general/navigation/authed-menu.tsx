'use client'

import { memo } from 'react'
import { useEvents } from '@app/data'
import { features } from '@app/configs'
import { FeaturesCell } from '../cells'
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
  const { account } = useAuthContext()
  const { inited, activeSubscription } = account
  // initial page load show skeleton [first load state]
  const initialLoad = loading && !inited

  return (
    <nav>
      <ul className='list-none py-2'>
        {features.map(({ feature }: any, index: number) => (
          <FeaturesCell
            key={index}
            feature={feature}
            index={index}
            focused={route?.includes(feature)} // use page meta TODO
            events={events}
            setEvents={setEvents}
            initialLoad={initialLoad}
            activeSubscription={activeSubscription}
          />
        ))}
      </ul>
    </nav>
  )
}

export const AuthedMenu = memo(AuthedMenuComponent)
