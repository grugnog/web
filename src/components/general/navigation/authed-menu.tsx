import { memo, SyntheticEvent } from 'react'
import { List } from '@material-ui/core'
import { useFeaturesData, userModel, useEvents } from '@app/data'
import { features } from '@app/configs'
import { FeaturesCell } from '../cells'

interface AuthedMenu {
  route?: string
  isMobile?: boolean
  dataSourceMap?: any
}

// Side menu that appears on application routes
export function AuthedMenuComponent({ route, dataSourceMap }: AuthedMenu) {
  const { events, setEvents } = useEvents()
  const { toggleAlert, toggleAlertData } = useFeaturesData()

  const enabledAlerts = userModel.alertEnabled({
    toggleCombiner: toggleAlertData?.toggleAlert?.alertEnabled,
    networkCombiner:
      !toggleAlertData?.toggleAlert && dataSourceMap?.user?.alertEnabled,
  })

  const onAlertToggle = async (e?: SyntheticEvent<HTMLInputElement>) => {
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
  }

  return (
    <nav>
      <List>
        {features.map(({ feature }: any, index: number) => (
          <FeaturesCell
            key={index}
            alertEnabled={false}
            feature={feature}
            index={index}
            focused={route?.includes(feature)} // use page meta TODO
            events={events}
            setEvents={setEvents}
            toggleAlert={onAlertToggle}
          />
        ))}
      </List>
    </nav>
  )
}

export const AuthedMenu = memo(AuthedMenuComponent)
