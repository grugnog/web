import React, { useCallback, memo, SyntheticEvent } from 'react'
import { List } from '@material-ui/core'
import { featuresData, userModel, useEvents } from '@app/data'
import { features } from '@app/configs'
import { FeaturesCell } from '../cells'

interface AuthedMenu {
  route?: string
  isMobile?: boolean
  dataSourceMap?: any
}

// Side menu that appears on application routes
export function AuthedMenuComponent({
  route,
  isMobile,
  dataSourceMap,
}: AuthedMenu) {
  const { toggleAlert, toggleAlertData } = featuresData()
  const { events, setEvents } = useEvents()
  const enabledAlerts = userModel.alertEnabled({
    toggleCombiner: toggleAlertData?.toggleAlert?.alertEnabled,
    networkCombiner:
      !toggleAlertData?.toggleAlert && dataSourceMap?.user?.alertEnabled,
  })

  const onAlertToggle = useCallback(
    async (e?: SyntheticEvent<HTMLInputElement>) => {
      try {
        e?.stopPropagation()
        await toggleAlert({
          variables: {
            alertEnabled: !enabledAlerts,
          },
        })
      } catch (e) {
        console.error(e)
      }
    },
    [enabledAlerts, toggleAlert]
  )

  return (
    <List>
      {features.map(({ feature }: any, index: number) => (
        <FeaturesCell
          key={index}
          alertEnabled={!!enabledAlerts}
          feature={feature}
          index={index}
          focused={route === feature}
          events={events}
          isMobile={isMobile}
          setEvents={setEvents}
          toggleAlert={index === 0 ? onAlertToggle : undefined}
        />
      ))}
    </List>
  )
}

export const AuthedMenu = memo(AuthedMenuComponent)
