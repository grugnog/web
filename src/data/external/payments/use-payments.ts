import { AppManager, UserManager } from '@app/managers'
import { useRouter } from 'next/router'
import { usePayments } from './payments'

type TokenParams = { plan?: string; yearly?: boolean; referral?: string }

// build from payments gql hook for page interaction
export const usePaymentsHook = (skip?: boolean) => {
  const { data, loading, addSubscription, cancelSubscription, refetch } =
    usePayments(skip)
  const router = useRouter()

  // on valid payment handling re-set current token
  const onToken = async (
    token: any,
    { plan, yearly, referral }: TokenParams,
    noRedirect?: boolean
  ) => {
    !noRedirect &&
      AppManager.toggleSnack(true, 'Processing payment...', 'success')
    try {
      const res = await addSubscription({
        variables: {
          // todo: move plan to param instead of tying to stripeToken
          stripeToken: JSON.stringify(
            token
              ? {
                  ...token,
                  plan,
                  referral,
                }
              : {
                  plan,
                  referral,
                }
          ),
          email: token?.email,
          yearly,
        },
      })

      const jwt = res?.data?.addPaymentSubscription?.user?.jwt

      if (jwt) {
        UserManager.setJwt(jwt)
        AppManager.toggleSnack(true, 'Upgrade success!', 'success')
        !noRedirect && (await router.push('/dashboard'))
      } else {
        AppManager.toggleSnack(
          true,
          'An issue occurred. Please contact support',
          'error'
        )
      }
    } catch (e) {
      console.error(e)
      AppManager.toggleSnack(
        true,
        'A Payment issue occurred. Please contact support',
        'error'
      )
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
        await router.push('/dashboard')
      } catch (e) {
        console.error(e)
      }
    } else {
      AppManager.toggleSnack(
        true,
        'An Error occurred trying to cancel. Please contact support.',
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
    refetch,
  }
}
