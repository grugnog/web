import { memo } from 'react'
import { AppManager } from '@app/managers'
import {
  GrCode as CodeIcon,
  GrAnalytics as DataUsageIcon,
  GrBug as BugReportIcon,
  GrApps as DashboardIcon,
  GrCatalog as PageIcon,
  GrAction as ActionIcon,
} from 'react-icons/gr'

import { Link } from '../link'
import { Pulse } from '../loaders'

const renderIcon = (feature?: string, className?: string) => {
  switch (feature) {
    case 'Scripts':
      return <CodeIcon className={className} />
    case 'Analytics':
      return <DataUsageIcon className={className} />
    case 'Issues':
      return <BugReportIcon className={className} />
    case 'Pages':
      return <PageIcon className={className} />
    case 'Dashboard':
      return <DashboardIcon className={className} />
    case 'Actions':
      return <ActionIcon className={className} />
    default: {
      return <div className={className} />
    }
  }
}

const extraProps = (feature?: string, focused?: boolean, setEvents?: any) => {
  switch (feature) {
    case 'Scripts':
      return {
        href: focused ? '/dashboard' : '/scripts',
        onClick: setEvents ? () => setEvents({ firstAdd: 'set' }) : undefined,
        color: 'inherit',
      }
    case 'Issues':
      return {
        href: focused ? '/dashboard' : '/web-issues',
        color: 'inherit',
      }
    case 'Pages':
      return {
        href: focused ? '/dashboard' : '/web-pages',
        color: 'inherit',
      }
    case 'Analytics':
      return {
        href: focused ? '/dashboard' : '/website-analytics',
        color: 'inherit',
      }
    case 'Dashboard':
      return {
        href: '/',
        color: 'inherit',
      }
    case 'Actions':
      return {
        href: focused ? '/dashboard' : '/web-actions',
        color: 'inherit',
      }
    default: {
      return null
    }
  }
}

function renderGuide(index: number, events: any) {
  if (index === 0 && events?.firstAdd === true) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        <Pulse visible size={20} />
      </div>
    )
  }

  return null
}

const listTitleStyle = 'sr-only sm:text-xs sm:not-sr-only md:text-sm'

// todo: types
export function FeaturesCellComponent({
  feature,
  index,
  focused,
  events,
  setEvents,
  activeSubscription,
}: any) {
  const title = focused ? 'Dashboard' : feature
  const blocked = !activeSubscription && index >= 2

  const onUpgradeEvent = () => {
    AppManager.toggleSnack(
      true,
      `${feature} requires paid plan, upgrade your account to get access.`,
      'error',
      false,
      true
    )
  }

  if (blocked) {
    return (
      <li>
        <button
          className={`flex w-full text-gray-400 bg-gray-200 place-items-center gap-x-3 py-3 pl-2 pr-2 place-content-around min-h-[44px] hover:opacity-70 hover:no-underline md:py-2 md:pl-5 md:pr-2 md:min-h-[54px]`}
          onClick={onUpgradeEvent}
        >
          <div className='flex flex-1 text-xs md:text-sm place-items-center gap-x-2 place-content-center md:place-content-start sm:gap-x-3 md:gap-x-4'>
            {renderIcon(title, 'grIcon ')}
            <div className={listTitleStyle}>{title}</div>
          </div>
          {renderGuide(index, events)}
        </button>
      </li>
    )
  }

  return (
    <li>
      <Link
        className={`flex place-items-center gap-x-3 py-3 pl-2 pr-2 place-content-around min-h-[44px] hover:opacity-70 hover:no-underline md:py-2 md:pl-5 md:pr-2 md:min-h-[54px]`}
        {...extraProps(feature, focused, setEvents)}
      >
        <div className='flex flex-1 text-xs md:text-sm place-items-center gap-x-2 place-content-center md:place-content-start sm:gap-x-3 md:gap-x-4'>
          {renderIcon(title, 'grIcon')}
          <div className={listTitleStyle}>{title}</div>
        </div>
        {renderGuide(index, events)}
      </Link>
    </li>
  )
}

export const FeaturesCell = memo(FeaturesCellComponent)
