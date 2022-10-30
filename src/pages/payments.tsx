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
import { useRouter } from 'next/router'
import { Box } from '@a11ywatch/ui'

import { CheckoutForm } from '@app/components/stripe/checkout'
import { StripeBadges } from '@app/components/stripe/badges'
import { NavBar, PriceMemo, PageTitle } from '@app/components/general'
import { usePayments } from '@app/data'
import { metaSetter } from '@app/utils'
import { UserManager, AppManager } from '@app/managers'
import { EmptyPayments } from '@app/components/empty'
import { useBillingDisplay } from '@app/data/formatters'
import type { PageProps } from '@app/types'
import { StripProvider } from '@app/components/stripe/stripe-provider'

interface PaymentProps extends PageProps {
  hideTitle?: boolean
}

// determine what plan was used if routed via home
type Plan = {
  basic: boolean
  premium: boolean
}

// move plan and yearset SSR
function Payments({ hideTitle = false, name }: PaymentProps) {
  const router = useRouter()
  const { data, loading, addSubscription, cancelSubscription } = usePayments()
  const [state, setState] = useState<Plan>({
    basic: true,
    premium: false,
  })
  const { billingtitle } = useBillingDisplay(data?.invoice)
  const [yearly, setYearly] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  // router plan query
  const plan = String(router?.query?.plan).toLocaleLowerCase() as string
  const yearSet = String(router?.query?.yearly)

  useEffect(() => {
    if (yearSet !== 'undefined') {
      setYearly(true)
    }
    if (plan !== 'undefined') {
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

  // on valid payment handling re-set current token
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
    : 'Get the right plan for you. Upgrade or downgrade at any time.'

  const paymentSubscription = data?.paymentSubscription
  const nextPaymentDay =
    paymentSubscription?.current_period_end &&
    getDate(new Date(Number(paymentSubscription.current_period_end * 1000)))

  const price = state.basic ? 999 : 1999

  const priceMultiplyier = yearly ? 9 : ''
  const paymentDate = `Next payment will occur on ${billingtitle}`

  const role = data?.role

  // TODO: remove role block
  const superMode = !data?.activeSubscription && role === 3

  return (
    <>
      <NavBar title={name} backButton notitle />
      <Container>
        <Box className='py-2 md:flex md:flex-col content-center items-center'>
          {hideTitle ? null : <PageTitle>Payment Details</PageTitle>}
          <div className='max-w-[1200px] py-5'>
            {loading && !data ? (
              <EmptyPayments subTitle={subTitle} />
            ) : (
              <>
                <p className='text-xl pb-2'>{subTitle}</p>
                {superMode ? null : (
                  <div>
                    {renderPayMentBoxes ? (
                      <div className='space-y-2 py-1'>
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
                          <StripProvider>
                            <CheckoutForm
                              onToken={onToken}
                              basic={state.basic}
                              price={Number(`${price}${priceMultiplyier}`)}
                              disabled={Boolean(!state.basic && !state.premium)}
                            />
                          </StripProvider>
                        </div>
                        <StripeBadges />
                      </div>
                    ) : (
                      <div>
                        {nextPaymentDay ? (
                          <p className='text-xl'> {paymentDate}</p>
                        ) : null}
                        <p className='text-xl font-bold'>Account Type</p>
                        <p className='text-xl capitalize'>
                          {superMode
                            ? 'Enterprise'
                            : `${paymentSubscription?.plan?.nickname} - $${
                                paymentSubscription?.plan?.amount / 100 || ''
                              }`}
                        </p>
                      </div>
                    )}
                    {data?.activeSubscription ? (
                      <div className='py-20'>
                        <Button
                          onClick={handleModal(true)}
                          variant={'outlined'}
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
          <Button onClick={handleModal(false)} variant='contained'>
            No
          </Button>
          <Button onClick={cancelConfirm}>Confirm Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
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
