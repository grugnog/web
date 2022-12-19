import { useMemo } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ADD_PAYMENT_SUBSCRIPTION, CANCEL_SUBSCRIPTION } from '@app/mutations'
import { GET_PAYMENTS, updateCache } from '@app/queries'
import { UserManager } from '@app/managers'

// get a user payments @param skip queries
export const usePayments = (skip?: boolean) => {
  const { data, loading, refetch } = useQuery(GET_PAYMENTS, {
    variables: {},
    ssr: false,
    skip,
  })

  const [
    addSubscription,
    { data: updateUserData, loading: addPaymentLoading },
  ] = useMutation(ADD_PAYMENT_SUBSCRIPTION, updateCache as any)

  const [cancelSubscription, { loading: cancelSubscriptionLoading }] =
    useMutation(CANCEL_SUBSCRIPTION)

  const user = data?.user
  const newUser = updateUserData?.updateUserData?.user

  // merge user between updates
  const useUserData = useMemo(() => {
    if (user) {
      return user
    }
    if (user && newUser) {
      return Object.assign({}, user, newUser)
    }
    return null
  }, [user, newUser])

  useMemo(() => {
    if (newUser && newUser?.role) {
      UserManager.setJwt(newUser.jwt)
    }
  }, [newUser])

  const model = Object.freeze({
    data: useUserData,
    loading: loading || addPaymentLoading || cancelSubscriptionLoading,
    addSubscription,
    cancelSubscription,
    refetch,
  })

  return model
}
