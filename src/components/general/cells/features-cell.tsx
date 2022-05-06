import React, { memo } from 'react'
import {
  FormControlLabel,
  Switch,
  ListItemIcon,
  ListItem,
} from '@material-ui/core'
import {
  GrNotification as NotificationsIcon,
  GrCode as CodeIcon,
  GrAnalytics as DataUsageIcon,
  GrBug as BugReportIcon,
  GrHistory as HistoryIcon,
  GrApps as DashboardIcon,
} from 'react-icons/gr'

import { cellStyles } from '@app/styles/cells'
import { Link } from '../link'
import { Pulse } from '../loaders'

const renderIcon = (feature?: string, className?: string) => {
  switch (feature) {
    case 'Alerts':
      return <NotificationsIcon className={className} />
    case 'Scripts':
      return <CodeIcon />
    case 'Analytics':
      return <DataUsageIcon />
    case 'Issues':
      return <BugReportIcon />
    case 'Dashboard':
      return <DashboardIcon />
    case 'History':
      return <HistoryIcon />
    default:
      return <div />
  }
}

const extraProps = (feature?: string, focused?: boolean, setEvents?: any) => {
  switch (feature) {
    case 'Alerts':
      return {
        href: focused ? '/' : '/alerts',
        component: Link,
        color: 'inherit',
      }
    case 'Scripts':
      return {
        href: focused ? '/' : '/scripts',
        onClick: setEvents ? () => setEvents({ firstAdd: 'set' }) : undefined,
        component: Link,
        color: 'inherit',
      }
    case 'Issues':
      return {
        href: focused ? '/' : '/web-issues',
        component: Link,
        color: 'inherit',
      }
    case 'Analytics':
      return {
        href: focused ? '/' : '/website-analytics',
        component: Link,
        color: 'inherit',
      }
    case 'Dashboard':
      return {
        href: '/',
        component: Link,
        color: 'inherit',
      }
    case 'History':
      return {
        href: focused ? '/' : '/history',
        component: Link,
        color: 'inherit',
      }
    default:
      return null
  }
}

function renderGuide(index: number, events: any) {
  if (index === 1 && events?.firstAdd === true) {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', flex: 1 }}>
        <Pulse visible size={20} />
      </div>
    )
  }

  return null
}

export function FeaturesCellComponent({
  feature,
  alertEnabled = false,
  index,
  toggleAlert,
  focused,
  isMobile,
  events,
  setEvents,
}: any) {
  const classes = cellStyles()

  return (
    <li>
      <ListItem
        button
        className={classes.topList}
        {...extraProps(feature, focused, setEvents)}
      >
        <ListItemIcon>
          {renderIcon(
            focused ? 'Dashboard' : feature,
            (index === 0 && alertEnabled && !isMobile && classes.alert) ||
              undefined
          )}
        </ListItemIcon>
        {focused ? 'Dashboard' : feature}
        {index === 0 ? (
          <FormControlLabel
            checked={alertEnabled}
            value='Alerts'
            control={<Switch color='primary' />}
            label=''
            labelPlacement='start'
            className={classes.toggleAlert}
            onClick={toggleAlert}
          />
        ) : null}
        {!isMobile ? renderGuide(index, events) : null}
      </ListItem>
    </li>
  )
}

export const FeaturesCell = memo(FeaturesCellComponent)
