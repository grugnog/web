import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks'
import { useMemo } from 'react'

import {
  UPDATE_USER,
  SET_PAGESPEED_KEY,
  RESET_PASSWORD,
  FORGOT_PASSWORD,
  CONFIRM_EMAIL,
  FILTER_EMAIL_DATES,
} from '@app/mutations'
import { GET_USER, updateCache } from '@app/queries'
import { AppManager, UserManager } from '@app/managers'
import { EMAIL_VERIFIED_SUBSCRIPTION } from '@app/subscriptions'
import { GET_USER_PROFILE, GET_USER_SETTINGS } from '@app/queries/user'

export const userData = (skip?: boolean, query?: 'profile' | 'settings') => {
  const variables = {}
  const profileQuery = query === 'profile'
  const settingsQuery = query === 'settings'

  const { data, loading } = useQuery(GET_USER, {
    variables,
    skip: skip || profileQuery || settingsQuery,
  })

  const { data: profile, loading: profileLoading } = useQuery(
    GET_USER_PROFILE,
    {
      variables,
      skip: !profileQuery,
    }
  )

  const { data: settings, loading: settingsLoading } = useQuery(
    GET_USER_SETTINGS,
    {
      variables,
      skip: !settingsQuery,
    }
  )

  const [
    updateUser,
    { data: updateUserData, loading: updateUserLoading },
  ] = useMutation(UPDATE_USER, updateCache as any)

  const [
    forgotPassword,
    { data: forgotPasswordData, loading: forgotPasswordLoading },
  ] = useMutation(FORGOT_PASSWORD)

  const [
    resetPassword,
    { data: resetPasswordData, loading: resetPasswordLoading },
  ] = useMutation(RESET_PASSWORD)

  const [confirmEmail] = useMutation(CONFIRM_EMAIL)
  const [confirmPageSpeed] = useMutation(SET_PAGESPEED_KEY)

  const [
    filterEmailDates,
    { data: filterEmailDatesData, loading: filterEmailDatesLoading },
  ] = useMutation(FILTER_EMAIL_DATES)

  const { data: emailVerified } = useSubscription(EMAIL_VERIFIED_SUBSCRIPTION, {
    variables: { userId: UserManager.getID },
    skip,
  })

  const sendConfirmEmail = async () => {
    try {
      await confirmEmail({
        variables,
      })
      AppManager.toggleSnack(
        true,
        'Please check your email for confirmation link',
        'success'
      )
    } catch (e) {
      console.error(e)
    }
  }
  const onFilterEmailDates = async (
    dates: number[],
    morning: boolean = false
  ) => {
    const res = await filterEmailDates({
      variables: {
        emailFilteredDates: dates,
        morning,
      },
    }).catch((e: any) => {
      console.error(e)
    })
    if (res) {
      AppManager.toggleSnack(
        true,
        'Dates for allowed emails updated.',
        'success'
      )
    }
  }

  const onConfirmLighthouse = async (pageSpeedApiKey: string) => {
    // TODO: use api to validate
    if (!pageSpeedApiKey || (pageSpeedApiKey && pageSpeedApiKey.length <= 25)) {
      // invalid key
      AppManager.toggleSnack(true, 'Invalid Page Speed key.', 'error')
      return
    }
    const res = await confirmPageSpeed({
      variables: {
        pageSpeedApiKey,
      },
    }).catch((e: any) => {
      console.error(e)
      AppManager.toggleSnack(true, 'Request failed: Invalid key.', 'error')
    })
    if (res) {
      AppManager.toggleSnack(true, 'PageSpeed API key set.', 'success')
    }
  }

  useMemo(() => {
    if (emailVerified) {
      if (data?.user) {
        data.user.emailConfirmed = true
      }
    }
  }, [emailVerified])

  const model = Object.freeze({
    data: data || profile, // allow data or profile as main source
    forgotPasswordData,
    loading:
      loading ||
      updateUserLoading ||
      forgotPasswordLoading ||
      profileLoading ||
      settingsLoading ||
      resetPasswordLoading,
    updateUser,
    updateUserData,
    forgotPassword,
    resetPassword,
    resetPasswordData,
    sendConfirmEmail,
    onFilterEmailDates,
    filterEmailDatesData:
      filterEmailDatesData?.filterEmailDates?.emailFilteredDates ??
      data?.user?.emailFilteredDates,
    filterEmailDatesLoading,
    onConfirmLighthouse,
    settings,
  })

  return model
}
