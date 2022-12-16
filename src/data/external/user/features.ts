import { TOGGLE_ALERT } from '@app/mutations'
import { useMutation } from '@apollo/react-hooks'

export const useFeaturesData = () => {
  const [toggleAlert, { data: toggleAlertData, loading: toggleAlertLoading }] =
    useMutation(TOGGLE_ALERT)

  return Object.freeze({
    toggleAlertLoading,
    toggleAlert: async (alertParams?: any) => {
      if (alertParams?.variables) {
        await toggleAlert(alertParams)
      }
    },
    toggleAlertData,
  })
}
