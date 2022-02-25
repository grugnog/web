/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useEffect, useState } from 'react'
import { getDate, format } from 'date-fns'
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
import { getOrdinalSuffix, metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useRouter } from 'next/router'
import { UserManager, AppManager } from '@app/managers'
import { CheckoutForm } from '@app/components/stripe/checkout'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { STRIPE_KEY } from '@app/configs/app-config'
import { EmptyPayments } from '@app/components/empty'

const stripePromise = loadStripe(STRIPE_KEY)

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancel: {
    border: '1px solid #000',
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

function Payments({ hideTitle = false, name }: PaymentProps) {
  const classes = useStyles()
  const router = useRouter()
  const { data, loading, addSubscription, cancelSubscription } = paymentsData()
  const [state, setState] = useState<Plan>({
    basic: true,
    premium: false,
  })
  const [yearly, setYearly] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const plan = String(router?.query?.plan).toLocaleLowerCase() as string
  const yearSet = String(router?.query?.yearly)

  useEffect(() => {
    if (yearSet && yearSet !== 'undefined') {
      setYearly(true)
    }
  }, [setYearly, yearSet])

  useEffect(() => {
    if (plan && plan !== 'undefined') {
      setState({ basic: false, premium: false, [plan]: plan })
    }
  }, [setState, plan])

  const handleChange = (newState: any) => {
    setState({
      basic: newState === 'Basic',
      premium: newState === 'Premium',
    })
  }

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
        router.push('/dashboard')
      }
    } catch (e) {
      console.error(e)
    }
  }

  const handleModal = (modalOpen: boolean) => () => {
    setOpen(modalOpen)
  }

  const cancelConfirm = async () => {
    const res = await cancelSubscription({
      variables: {
        email: data?.email,
      },
    })
    AppManager.toggleSnack(true, 'Payment cancelled!', 'success')
    setOpen(false)
    const jwt = res?.data?.cancelSubscription?.user.jwt

    if (jwt) {
      UserManager.setJwt(jwt)
    }

    router.push('/dashboard')
  }

  const renderPayMentBoxes = data?.role === 0 && !data.activeSubscription

  const paymentSubscription = data?.paymentSubscription
  const nextPaymentDay =
    paymentSubscription?.current_period_end &&
    getDate(new Date(Number(paymentSubscription.current_period_end * 1000)))
  const startDate =
    paymentSubscription?.current_period_start &&
    new Date(Number(paymentSubscription.start_date * 1000))
  const price = state.basic ? 999 : 1999
  const priceMultiplyier = yearly ? 9 : ''
  const paymentDate = `${name} will occur on the ${
    paymentSubscription?.plan?.interval === 'year'
      ? `${format(startDate, 'MMMM')} `
      : ''
  }${getOrdinalSuffix(nextPaymentDay)} of every ${
    paymentSubscription?.plan?.interval ?? 'month'
  }`

  const subTitle = !renderPayMentBoxes
    ? 'Account Info'
    : 'Select an option to get started upgrading your account.'

  return (
    <Elements stripe={stripePromise}>
      <NavBar title={name} backButton notitle />
      <Container maxWidth='xl'>
        <Box>
          {hideTitle ? null : <PageTitle>{name}</PageTitle>}
          {loading && !data ? (
            <EmptyPayments subTitle={subTitle} />
          ) : (
            <div>
              <p className='text-xl font-bold'>{subTitle}</p>
              {renderPayMentBoxes ? (
                <PriceMemo
                  priceOnly
                  basic={state.basic || data?.role === 1}
                  premium={state.premium || data?.role === 2}
                  onClick={handleChange}
                  setYearly={setYearly}
                  yearly={yearly}
                />
              ) : (
                <div>
                  {nextPaymentDay ? (
                    <p className='text-xl'> {paymentDate}</p>
                  ) : null}
                  <p className='text-2xl font-bold'>Account Type</p>
                  <p className='text-xl'>
                    {`${
                      paymentSubscription?.plan?.nickname ||
                      getPlanName(paymentSubscription?.plan?.amount)
                    } - $${paymentSubscription?.plan?.amount / 100 || ''}`}
                  </p>
                </div>
              )}
              <div className='py-10'>
                {!renderPayMentBoxes ? (
                  <Button
                    title={'Cancel Subscription'}
                    type={'button'}
                    onClick={handleModal(true)}
                    className={classes.cancel}
                  >
                    Cancel Subscription
                  </Button>
                ) : (
                  <CheckoutForm
                    onToken={onToken}
                    basic={state.basic}
                    price={Number(`${price}${priceMultiplyier}`)}
                    disabled={Boolean(!state.basic && !state.premium)}
                  />
                )}
              </div>
              <Dialog
                open={open}
                onClose={handleModal(false)}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'Cancel your subscription? You can always re-sub later on.'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    Confirm cancel for {data?.role === 1 ? 'basic' : 'premium'}{' '}
                    subscription.
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
                  <Button
                    onClick={cancelConfirm}
                    color='primary'
                    variant='contained'
                    type='submit'
                  >
                    Confirm Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </Box>
      </Container>
    </Elements>
  )
}

export default metaSetter(
  { Payments },
  {
    description:
      'Payment plans that can be adjusted at any time to better your fit you.',
    gql: true,
  }
)
