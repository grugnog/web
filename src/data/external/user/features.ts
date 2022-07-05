import { userModel } from '@app/data'
import { TOGGLE_ALERT, TOGGLE_PROFILE } from '@app/mutations'
import { useMutation } from '@apollo/react-hooks'

export const useFeaturesData = () => {
  const [
    toggleAlert,
    { data: toggleAlertData, loading: toggleAlertLoading },
  ] = useMutation(TOGGLE_ALERT)
  const [
    toggleProfile,
    { data: toggleProfileData, loading: toggleProfileLoading },
  ] = useMutation(TOGGLE_PROFILE)

  return Object.freeze({
    toggleAlertLoading,
    toggleAlert: (alertParams?: any) => {
      if (alertParams?.variables) {
        toggleAlert(alertParams)
        userModel.toggleAlert(alertParams.variables.alertEnabled)
      }
    },
    toggleAlertData,
    toggleProfileLoading,
    toggleProfile: (alertParams?: any) => {
      if (alertParams?.variables) {
        toggleProfile(alertParams)
      }
    },
    toggleProfileData,
  })
}
