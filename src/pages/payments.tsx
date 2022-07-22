import { useEffect, useState } from 'react'
import { getDate } from 'date-fns'
import {
  Container,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NavBar, PriceMemo, PageTitle } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { paymentsData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useRouter } from 'next/router'
import { UserManager, AppManager } from '@app/managers'
import { CheckoutForm } from '@app/components/stripe/checkout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { STRIPE_KEY } from '@app/configs/app-config'
import { EmptyPayments } from '@app/components/empty'
import { useBillingDisplay } from '@app/data/formatters'
import { GrCreditCard, GrPaypal, GrVisa } from 'react-icons/gr'

const useStyles = makeStyles(() => ({
  cancel: {
    border: '1px solid #0E1116',
  },
  cancelBtn: {
    background: 'transparent',
    boxShadow: 'none',
  },
}))

interface PaymentProps extends PageProps {
  hideTitle?: boolean
}

type Plan = {
  basic: boolean
  premium: boolean
}

// determine the plan name
const getPlanName = (plan: number): string => {
  let tier = 'Basic'
  if ([999, 9999].includes(plan)) {
    tier = 'Basic'
  }
  if ([9999, 1999].includes(plan)) {
    tier = 'Premium'
  }
  return tier
}

// move plan and yearset SSR
function Payments({ hideTitle = false, name }: PaymentProps) {
  const classes = useStyles()
  const router = useRouter()
  const { data, loading, addSubscription, cancelSubscription } = paymentsData()
  const [state, setState] = useState<Plan>({
    basic: true,
    premium: false,
  })
  const { billingtitle } = useBillingDisplay(data?.invoice)
  const [yearly, setYearly] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [stripePromise, setStripe] = useState<Stripe | null>(null)

  const plan = String(router?.query?.plan).toLocaleLowerCase() as string
  const yearSet = String(router?.query?.yearly)

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
            'Error, Please contact support.',
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

  useEffect(() => {
    if (yearSet && yearSet !== 'undefined') {
      setYearly(true)
    }
    if (plan && plan !== 'undefined') {
      setState({ basic: false, premium: false, [plan]: plan })
    }
  }, [yearSet, plan])

  const handleChange = (newState: any) => {
    setState({
      basic: newState === 'Basic',
      premium: newState === 'Premium',
    })

    // todo remove for ref
    const inputElement = document.querySelector('input')

    if (inputElement) {
      inputElement.focus()
    }
  }

  // on valid payment handling
  const onToken = async (token: any) => {
    try {
      if (token) {
        AppManager.toggleSnack(true, 'Processing payment...', 'success')

        const res = await addSubscription({
          variables: {
            stripeToken: JSON.stringify({
              ...token,
              plan: state.premium ? 1 : 0,
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

  // open payment modal
  const handleModal = (modalOpen: boolean) => () => {
    setOpen(modalOpen)
  }

  // cancel the payment subscription
  const cancelConfirm = async () => {
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
      setOpen(false)

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

  const renderPayMentBoxes = data?.role === 0 && !data.activeSubscription

  const subTitle = !renderPayMentBoxes
    ? 'Account Info'
    : 'Get the right plan for you.'

  const paymentSubscription = data?.paymentSubscription
  const nextPaymentDay =
    paymentSubscription?.current_period_end &&
    getDate(new Date(Number(paymentSubscription.current_period_end * 1000)))

  const price = state.basic ? 999 : 1999

  const priceMultiplyier = yearly ? 9 : ''
  const paymentDate = `Next payment will occur on ${billingtitle}`

  const role = data?.role

  const superMode = !data?.activeSubscription && role === 3

  return (
    <Elements stripe={stripePromise}>
      <NavBar title={name} backButton notitle />
      <Container maxWidth='xl'>
        <Box className='py-2 md:flex md:flex-col content-center items-center'>
          {hideTitle ? null : <PageTitle>Payment Details</PageTitle>}
          <div className='max-w-[1200px]'>
            {loading && !data ? (
              <EmptyPayments subTitle={subTitle} />
            ) : (
              <>
                <p className='text-xl font-bold'>{subTitle}</p>
                {superMode ? (
                  <div>
                    <h3 className='text-2xl pb-2'>Enterprise Account</h3>
                    <div className='border p-4 rounded'>
                      <p>
                        If you need changes to your account contact support.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    {renderPayMentBoxes ? (
                      <div className='space-y-3'>
                        <PriceMemo
                          priceOnly
                          basic={state.basic || role === 1}
                          premium={state.premium || role === 2}
                          onClick={handleChange}
                          setYearly={setYearly}
                          yearly={yearly}
                          blockFree
                          blockEnterprise
                        />
                        <div className='sm:w-full place-content-center place-items-center min-w-[350px] align-center'>
                          <CheckoutForm
                            onToken={onToken}
                            basic={state.basic}
                            price={Number(`${price}${priceMultiplyier}`)}
                            disabled={Boolean(!state.basic && !state.premium)}
                          />
                        </div>
                        <div className='hidden lg:flex gap-1 max-w-xs'>
                          <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center bg-white'>
                            <GrVisa className='grIcon text-black' />
                          </div>

                          <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center bg-white'>
                            <GrCreditCard className='grIcon text-black' />
                          </div>
                          <div className='border rounded px-1 py-1 flex-1 flex items-center justify-center bg-white'>
                            <GrPaypal className='grIcon text-black' />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {nextPaymentDay ? (
                          <p className='text-xl'> {paymentDate}</p>
                        ) : null}
                        <p className='text-xl font-bold'>Account Type</p>
                        <p className='text-xl'>
                          {superMode
                            ? 'Enterprise'
                            : `${
                                paymentSubscription?.plan?.nickname ||
                                getPlanName(paymentSubscription?.plan?.amount)
                              } - $${
                                paymentSubscription?.plan?.amount / 100 || ''
                              }`}
                        </p>
                      </div>
                    )}
                    {data?.activeSubscription ? (
                      <div className='py-3'>
                        <Button
                          title={'Cancel Subscription'}
                          type={'button'}
                          onClick={handleModal(true)}
                          className={classes.cancel}
                        >
                          Cancel Subscription
                        </Button>
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            )}
          </div>
        </Box>
      </Container>
      <Dialog
        open={open}
        onClose={handleModal(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Cancel your subscription?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Confirm cancel for {data?.role === 1 ? 'basic' : 'premium'}{' '}
            subscription. You can always re-sub later on.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleModal(false)}
            variant='contained'
            className={classes.cancelBtn}
          >
            No
          </Button>
          <Button onClick={cancelConfirm} color='secondary' variant='outlined'>
            Confirm Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Elements>
  )
}

export default metaSetter(
  { Payments },
  {
    description:
      'Payment plans that can be adjusted at any time. Scale with your team and your web needs.',
    gql: true,
    intercom: true,
  }
)
