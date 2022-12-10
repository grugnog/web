import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogActions,
} from '@material-ui/core'
import { useRouter } from 'next/router'

import { CheckoutForm } from '@app/components/stripe/checkout'
import { StripeBadges } from '@app/components/stripe/badges'
import { Button, NavBar, PriceMemo } from '@app/components/general'
import { metaSetter } from '@app/utils'
import { EmptyPayments } from '@app/components/empty'
import type { PageProps } from '@app/types'
import { StripProvider } from '@app/components/stripe/stripe-provider'
import { Header } from '@app/components/general/header'
import { StateLessDrawer } from '@app/components/general/drawers'
import { SectionContainer } from '@app/app/containers/section-container'
import { priceHandler } from '@app/utils/price-handler'
import { usePaymentsHook } from '@app/data/external/payments/use-payments'
import { roleMap } from '@app/utils/role-map'
import { CheckoutFormless } from '@app/components/stripe/formless'

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
    ? 'Set the payment plan that makes sense for you.'
    : 'Get the right plan for you. Upgrade or downgrade at any time.'
}

// move plan and yearset SSR
function Payments({ hideTitle = false, name }: PaymentProps) {
  const router = useRouter()
  const { data, loading, onCancelConfirm, onToken } = usePaymentsHook()
  const [selectedPlan, setState] = useState<string>()
  const [newCard, setNewCard] = useState<boolean>(false)
  const [yearly, setYearly] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [referral, setReferral] = useState<string>('')

  // router plan query
  const queryPlan = (router?.query?.plan as string) ?? ''
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
    if (queryPlan) {
      setState(queryPlan)
    }
  }, [yearSet, queryPlan])

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
    await onToken(token, { plan: selectedPlan, yearly, referral })
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

  const paymentSubscription = data?.paymentSubscription
  const partnerProgram = !loading && data?.role && !paymentSubscription
  // allow payments on all non maxed accounts
  const subTitle = renderPaymentTitle(partnerProgram)

  const priceMultiplyier = yearly ? 0 : ''
  const currentPlan = roleMap(data?.role)
  const price = priceHandler(
    selectedPlan || (data?.role && currentPlan) || 'L1'
  )
  const selectedPrice = Number(`${price}${priceMultiplyier}`)

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
              <PriceMemo
                priceOnly
                onClick={handleChange}
                role={data?.role}
                currentPlan={currentPlan}
                setYearly={setYearly}
                yearly={yearly}
                initialIndex={data?.role >= 5 ? data.role - 6 : data?.role}
                highPlan={data?.role >= 5}
              />
              <div>
                {!partnerProgram ? (
                  <div className='space-y-12 py-1'>
                    <div className='sm:w-full place-content-center place-items-center align-center min-w-[350px]'>
                      <div className='space-y-4'>
                        {!data.activeSubscription || newCard ? (
                          <>
                            {newCard && data.activeSubscription ? (
                              <Button onClick={() => setNewCard((x) => !x)}  className={'border-none font-semibold'}>
                                Use Old Card
                              </Button>
                            ) : null}
                            <StripProvider>
                              <CheckoutForm
                                onToken={onTokenEvent}
                                plan={selectedPlan}
                                price={selectedPrice}
                                disabled={Boolean(!selectedPlan)}
                              />
                            </StripProvider>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => setNewCard((x) => !x)}
                              className={'border-none font-semibold text-green-700'}
                            >
                              Add New Card
                            </Button>
                            <CheckoutFormless
                              onToken={onTokenEvent}
                              plan={selectedPlan || currentPlan}
                              price={selectedPrice}
                              disabled={Boolean(!selectedPlan)}
                            />
                          </>
                        )}
                      </div>
                    </div>
                    <StripeBadges />
                  </div>
                ) : (
                  <div>
                    <div className='text-base font-semibold'>
                      Partner Program Enabled
                    </div>
                    <p>
                      {paymentSubscription
                        ? yearly
                          ? 'Yearly'
                          : 'Monthly'
                        : 'Contact support to alter your plan'}
                    </p>
                  </div>
                )}
                {data?.activeSubscription ? (
                  <div className='py-40'>
                    <Button
                      onClick={handleModal(true)}
                      className={'border-none text-red-700'}
                    >
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
        <div className='space-y-6 p-6 flex flex-col'>
          <p id='alert-dialog-title' className='text-xl font-medium'>
            Cancel your subscription?
          </p>
          <p id='alert-dialog-description'>
            Confirm cancel for <b>{roleMap(data?.role)}</b> subscription? You
            can always re-sub later on. Cancelling resets all of your data from
            your account. Please make sure to backup your data accordingly.
          </p>
        </div>
        <DialogActions>
          <Button onClick={handleModal(false)}>No</Button>
          <Button
            onClick={onCancelEvent}
            className={'text-red-600 border-red-600'}
          >
            Confirm Cancel
          </Button>
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
