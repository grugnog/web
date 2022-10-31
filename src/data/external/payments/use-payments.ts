import { AppManager, UserManager } from '@app/managers'
import { useRouter } from 'next/router'
import { usePayments } from './payments'

// build from payments gql hook for page interaction
export const usePaymentsHook = () => {
  const { data, loading, addSubscription, cancelSubscription } = usePayments()
  const router = useRouter()

  // on valid payment handling re-set current token
  const onToken = async (
    token: any,
    { plan, yearly }: { plan?: string; yearly?: boolean }
  ) => {
    try {
      if (token) {
        AppManager.toggleSnack(true, 'Processing payment...', 'success')

        const res = await addSubscription({
          variables: {
            stripeToken: JSON.stringify({
              ...token,
              plan,
            }),
            email: token.email,
            yearly,
          },
        })

        const jwt = res?.data?.addPaymentSubscription?.user.jwt

        if (jwt) {
          UserManager.setJwt(jwt)
        }

        AppManager.toggleSnack(true, 'Payment confirmed!', 'success')

        await router.push('/')
      }
    } catch (e) {
      console.error(e)
    }
  }

  // cancel the payment subscription
  const onCancelConfirm = async () => {
    let res
    try {
      res = await cancelSubscription({
        variables: {
          email: data?.email,
        },
      })
    } catch (e) {
      console.error(e)
    }
    if (res) {
      AppManager.toggleSnack(true, 'Payment cancelled!', 'success')
      const jwt = res?.data?.cancelSubscription?.user.jwt
      if (jwt) {
        UserManager.setJwt(jwt)
      }
      try {
        await router.push('/')
      } catch (e) {
        console.error(e)
      }
    } else {
      AppManager.toggleSnack(
        true,
        'An Error occured trying to cancel. Please contact support.',
        'error'
      )
    }
  }

  return {
    data,
    loading,
    addSubscription,
    cancelSubscription,
    onToken,
    onCancelConfirm,
  }
}
