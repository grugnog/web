import { memo, PropsWithChildren, useEffect, useState } from 'react'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { AppManager } from '@app/managers'
import { STRIPE_KEY } from '@app/configs/app-config'

// Load stripe Elements
export const StripProviderWrapper = ({ children }: PropsWithChildren) => {
  const [stripePromise, setStripe] = useState<Stripe | null>(null)

  useEffect(() => {
    if (!stripePromise) {
      ;(async () => {
        try {
          const stripeObject = await loadStripe(STRIPE_KEY)
          if (stripeObject) {
            setStripe(stripeObject)
          }
        } catch (e) {
          console.error(e)
          AppManager.toggleSnack(
            true,
            'Error, Please contact support issue with payment processor.',
            'error'
          )
        }
      })()
    }
    // close the snackbar if routed from
    if (AppManager.snackbar.open) {
      AppManager.closeSnack()
    }
  }, [stripePromise])

  return <Elements stripe={stripePromise}>{children}</Elements>
}

export const StripProvider = memo(StripProviderWrapper)
