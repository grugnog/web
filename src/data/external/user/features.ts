import { userModel } from '@app/data'
import { TOGGLE_ALERT } from '@app/mutations'
import { useMutation } from '@apollo/react-hooks'

export const useFeaturesData = () => {
  const [toggleAlert, { data: toggleAlertData, loading: toggleAlertLoading }] =
    useMutation(TOGGLE_ALERT)

  return Object.freeze({
    toggleAlertLoading,
    toggleAlert: (alertParams?: any) => {
      if (alertParams?.variables) {
        toggleAlert(alertParams)
        userModel.toggleAlert(alertParams.variables.alertEnabled)
      }
    },
    toggleAlertData,
  })
}
