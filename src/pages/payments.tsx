import { useEffect, useState } from 'react'
import { getDate } from 'date-fns'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import { useRouter } from 'next/router'

import { CheckoutForm } from '@app/components/stripe/checkout'
import { StripeBadges } from '@app/components/stripe/badges'
import { NavBar, PriceMemo } from '@app/components/general'
import { metaSetter } from '@app/utils'
import { EmptyPayments } from '@app/components/empty'
import { useBillingDisplay } from '@app/data/formatters'
import type { PageProps } from '@app/types'
import { StripProvider } from '@app/components/stripe/stripe-provider'
import { Header } from '@app/components/general/header'
import { StateLessDrawer } from '@app/components/general/drawers'
import { SectionContainer } from '@app/app/containers/section-container'
import { priceHandler, getSelectedIndex } from '@app/utils/price-handler'
import { usePaymentsHook } from '@app/data/external/payments/use-payments'
import { roleMap } from '@app/utils/role-map'

interface PaymentProps extends PageProps {
  hideTitle?: boolean
}

declare global {
  var rewardful: any
  var Rewardful: { referral: string; rewardful(a: string): void }
}

// determine the page title
const renderPaymentTitle = (renderPayMentBoxes?: boolean) => {
  return !renderPayMentBoxes
    ? 'Account Info'
    : 'Get the right plan for you. Upgrade or downgrade at any time.'
}

// move plan and yearset SSR
function Payments({ hideTitle = false, name }: PaymentProps) {
  const router = useRouter()
  const { data, loading, onCancelConfirm, onToken } = usePaymentsHook()
  const [state, setState] = useState<string>('L1')
  const { billingtitle } = useBillingDisplay(data?.invoice)

  const [yearly, setYearly] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [referral, setReferral] = useState<string>('')

  // router plan query
  const plan = (router?.query?.plan as string) ?? ''
  const yearSet = (router?.query?.yearly as string) ?? ''

  useEffect(() => {
    if (window.rewardful) {
      window.rewardful('ready', () => {
        if (window.Rewardful.referral) {
          setReferral(window.Rewardful.referral)
        }
      })
    }
  }, [setReferral])

  useEffect(() => {
    if (yearSet) {
      setYearly(true)
    }
    if (plan) {
      setState(plan)
    }
  }, [yearSet, plan])

  const handleChange = (newState: any) => {
    setState(newState)
    // todo remove for ref
    const inputElement = document.querySelector('input')

    if (inputElement) {
      inputElement.focus()
    }
  }

  // on valid payment handling re-set current token
  const onTokenEvent = async (token: any) => {
    await onToken(token, { plan: state, yearly, referral })
  }

  // open payment modal
  const handleModal = (modalOpen: boolean) => () => {
    setOpen(modalOpen)
  }

  // cancel the payment subscription
  const onCancelEvent = async () => {
    setOpen(false)
    await onCancelConfirm()
  }

  const renderPayMentBoxes = data?.role === 0 && !data.activeSubscription
  const subTitle = renderPaymentTitle(renderPayMentBoxes)
  const paymentSubscription = data?.paymentSubscription
  const nextPaymentDay =
    paymentSubscription?.current_period_end &&
    getDate(new Date(Number(paymentSubscription.current_period_end * 1000)))

  const price = priceHandler(state)

  const priceMultiplyier = yearly ? 0 : ''
  const paymentDate = `Next payment will occur on ${billingtitle}`

  const planCost = paymentSubscription?.plan?.amount
    ? ` - ${paymentSubscription?.plan?.amount / 100 || ''}`
    : ''

  return (
    <>
      <NavBar title={name} backButton notitle />
      <StateLessDrawer>
        <SectionContainer container block>
          {hideTitle ? null : <Header>Payments</Header>}
          {loading && !data ? (
            <EmptyPayments subTitle={subTitle} />
          ) : (
            <>
              <p className='text-xl pb-2'>{subTitle}</p>
              {renderPayMentBoxes ? (
                <PriceMemo
                  priceOnly
                  onClick={handleChange}
                  setYearly={setYearly}
                  yearly={yearly}
                  selectedPlanIndex={getSelectedIndex(plan)}
                  highPlan={
                    (plan && plan[0] === 'H') || (plan && plan[0] === 'h')
                  }
                />
              ) : null}
              <div>
                {renderPayMentBoxes ? (
                  <div className='space-y-2 py-1'>
                    <div className='sm:w-full place-content-center place-items-center min-w-[350px] align-center'>
                      <StripProvider>
                        <CheckoutForm
                          onToken={onTokenEvent}
                          plan={state}
                          price={Number(`${price}${priceMultiplyier}`)}
                          disabled={Boolean(!state)}
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
                      {`${
                        paymentSubscription?.plan?.nickname ??
                        roleMap(data?.role)
                      }${planCost}`}
                    </p>
                    <p>
                      {paymentSubscription
                        ? yearly
                          ? 'Yearly'
                          : 'Monthly'
                        : 'Contact support to alter your plan'}
                    </p>

                    {!loading && data?.role && !paymentSubscription ? (
                      <div className='text-base font-semibold'>
                        Partner Program Enabled
                      </div>
                    ) : null}
                  </div>
                )}
                {data?.activeSubscription ? (
                  <div className='py-20'>
                    <Button onClick={handleModal(true)} variant={'outlined'}>
                      Cancel Subscription
                    </Button>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </SectionContainer>
      </StateLessDrawer>
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
            Confirm cancel for {roleMap(data?.role)} subscription. You can
            always re-sub later on.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal(false)} variant='contained'>
            No
          </Button>
          <Button onClick={onCancelEvent}>Confirm Cancel</Button>
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
  }
)
