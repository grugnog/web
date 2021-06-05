/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { useEffect, useState, useRef } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { getDate } from 'date-fns'
import {
  Container,
  Typography,
  Button,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { WithHydrate } from '@app/components/adhoc'
import { NavBar, Price, PageTitle } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { SimpleListItemSkeleton } from '@app/components/placeholders'
import { STRIPE_KEY } from '@app/configs'
import { withApollo } from '@app/apollo'
import { paymentsData } from '@app/data'
import { getOrdinalSuffix, metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useRouter } from 'next/router'

const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    marginBottom: 10.5,
  },
  submit: {
    minWidth: 170,
  },
  cancel: {
    marginTop: 60,
    marginBottom: 30,
    background: '#fff',
    color: '#000',
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

function Payments({ hideTitle = false, name }: PaymentProps) {
  const defaultState = {
    basic: true,
    premium: false,
  }
  const classes = useStyles()
  const router = useRouter()
  const { data, loading, addSubscription, cancelSubscription } = paymentsData()
  const [state, setState] = useState<Plan>(defaultState)
  const [open, setOpen] = useState<boolean>(false)
  const stripRef = useRef<any>()
  const plan = String(router?.query?.plan).toLocaleLowerCase() as string

  useEffect(() => {
    if (plan) {
      setState({ basic: false, premium: false, [plan]: plan })
    }
  }, [plan])

  const loadEvent = () => {
    if (plan) {
      // @ts-ignore
      const cb = requestIdleCallback ?? setTimeout

      cb(() => {
        if (
          stripRef?.current &&
          typeof stripRef?.current?.onClick === 'function'
        ) {
          stripRef?.current?.onClick()
        }
      })
    }
  }

  const handleChange = (newState: any) => () => {
    setState({
      basic: newState === 'Basic',
      premium: newState === 'Premium',
    })
  }

  const onToken = (token: any) => {
    if (token) {
      addSubscription({
        variables: {
          stripeToken: JSON.stringify({
            ...token,
            plan: state.premium ? 1 : 0,
          }),
          email: token.email,
        },
      })
    }
  }

  const handleModal = (modalOpen: boolean) => () => {
    setOpen(modalOpen)
  }

  const cancelConfirm = () => {
    cancelSubscription({
      variables: {
        email: data?.email,
      },
    })
    setOpen(false)
  }

  const renderPayMentBoxes = data?.role === 0 && !data.activeSubscription
  const nextPaymentDay =
    data?.paymentSubscription?.current_period_start &&
    getDate(new Date(data?.paymentSubscription?.current_period_start))

  return (
    <WithHydrate>
      <NavBar title={name} backButton notitle />
      <Container maxWidth='xl'>
        <Box>
          {hideTitle ? null : <PageTitle>{name}</PageTitle>}
          {loading && !data ? (
            <div>
              <Typography variant='subtitle1' component='p'>
                {!renderPayMentBoxes ? 'Account Info' : 'Upgrade Account'}
              </Typography>
              <List>
                <SimpleListItemSkeleton />
                <SimpleListItemSkeleton />
              </List>
            </div>
          ) : (
            <div>
              <Typography variant='subtitle1' component='p' gutterBottom>
                {!renderPayMentBoxes ? 'Account Info' : 'Upgrade Account'}
              </Typography>
              {renderPayMentBoxes ? (
                <Price
                  priceOnly
                  basic={state.basic || data?.role === 1}
                  premium={state.premium || data?.role === 2}
                  onClick={handleChange}
                />
              ) : (
                <div>
                  {nextPaymentDay ? (
                    <Typography variant='subtitle1' component='p'>
                      {`${name} will occur on the ${getOrdinalSuffix(
                        nextPaymentDay
                      )} of every month`}
                    </Typography>
                  ) : null}
                  <Typography variant='subtitle1' component='p'>
                    {`Account type ${
                      data?.paymentSubscription?.plan?.nickname || ''
                    } - $${
                      data?.paymentSubscription?.plan?.amount / 100 || ''
                    }`}
                  </Typography>
                </div>
              )}
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
                <StripeCheckout
                  ref={stripRef}
                  token={onToken}
                  // @ts-ignore
                  onScriptTagCreated={loadEvent}
                  name={state.basic ? 'Basic' : 'Premium'}
                  stripeKey={STRIPE_KEY + ''}
                  email={data?.email || ''}
                  bitcoin
                  // @ts-ignore
                  disabled={Boolean(!state.basic && !state.premium)}
                  amount={state.basic ? 1000 : 2000}
                  zipCode={false}
                  billingAddress={false}
                  // @ts-ignore
                  className={classes.cancel}
                  panelLabel={`${state.basic ? 'Basic' : 'Premium'} Plan`}
                >
                  <Button color='secondary' variant='contained'>
                    Start {state.basic ? 'Basic' : 'Premium'}
                  </Button>
                </StripeCheckout>
              )}
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
                    Cancel {data?.role === 1 ? 'basic' : 'premium'} subscription
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleModal(false)}
                    color='primary'
                    variant='contained'
                    className={classes.cancelBtn}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={cancelConfirm}
                    color='primary'
                    variant='contained'
                    type='submit'
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          )}
        </Box>
      </Container>
    </WithHydrate>
  )
}

export default withApollo(metaSetter({ Payments }))
