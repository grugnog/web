'use client'

import { useState } from 'react'
import { priceConfig } from '@app/configs'

import { Link } from '@app/app/typo/link'
import { SectionContainer } from '@app/app/containers/section-container'
import { SectionHeading } from '@app/app/typo/section-heading'
import { PriceCell } from './cells/price-cell'
import { PriceFeat } from './cells/price-feat'

const getStyles = (inactive: boolean) =>
  inactive
    ? 'relative px-2 border rounded-2xl py-2 text-sm font-bold text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 hover:shadow-xl'
    : 'relative px-2 rounded-2xl shadow-sm py-2 text-sm font-bold text-white bg-blue-600 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-500 focus:z-10 sm:w-auto sm:px-8'

const getPrimaryColor = (title: string) => {
  let color = '#0E1116'
  if (title === 'Premium') {
    color = '#8956ef'
  } else if (title === 'Free') {
    color = '#00875b'
  } else if (title === 'Basic') {
    color = '#2b72e6'
  }
  return color
}

function MainButton({
  title,
  navigate,
  yearly,
}: {
  title: string
  yearly: boolean
  navigate: boolean
}) {
  const buttonColor = getPrimaryColor(title)
  let textColor = '#fff'

  if (title === 'Premium') {
  } else if (title === 'Free') {
  } else if (title === 'Basic') {
    textColor = '#fff'
  } else if (title === 'Enterprise') {
    textColor = '#fff'
  }

  if (navigate) {
    return (
      <div className='pb-2 justify-center flex'>
        <Link
          className={`w-[12rem] px-4 py-2 hover:ring rounded-3xl font-bold text-center`}
          style={{
            backgroundColor: buttonColor,
            color: textColor,
            fontSize: '1.1rem',
          }}
          href={`/register?plan=${title}${yearly ? '&yearly=true' : ''}`}
        >
          {`${title} Start`}
        </Link>
      </div>
    )
  }

  return null
}

export function PriceMemo({
  onClick,
  navigate,
  yearly: year,
  setYearly: setYear,
  pricingPage,
  selectedPlanIndex = 0,
  highPlan = false,
}: any) {
  const [yearly, onSetYear] = useState<boolean>(!!year)
  const [selectedPlan, onSelectPlan] = useState<number>(selectedPlanIndex ?? 0)
  const [selectHighPlans, onSelectHigh] = useState<boolean>(highPlan)

  const setYearly = (params: any) => {
    if (typeof setYear === 'function') {
      setYear(params)
    }
    // inner state
    onSetYear(params)
  }

  const onSetYearlyEvent = () => {
    setYearly((x: boolean) => !x)
  }

  const onPlanClick = (title: string, index: number) => {
    if (typeof onClick === 'function') {
      onClick(title)
    }
    onSelectPlan(index)
  }

  const onTogglePlans = () => {
    onSelectHigh((x: boolean) => !x)
    if (typeof onClick === 'function') {
      const p = !selectHighPlans ? priceConfig.hPlans : priceConfig.lPlans
      const s = p[selectedPlan].title

      s && onClick(s)
    }
  }

  const plans = selectHighPlans ? priceConfig.hPlans : priceConfig.lPlans
  const selected = plans[selectedPlan].title

  return (
    <>
      {typeof onClick === 'undefined' && !pricingPage ? (
        <>
          <SectionHeading style={onClick ? { fontWeight: 200 } : {}}>
            {navigate ? 'Plans for everyone' : 'Pricing'}
          </SectionHeading>
          <p className='pb-2 text-xl'>
            Flexible plans that can be adjusted at anytime.
          </p>
        </>
      ) : null}

      <div className='flex space-x-1 place-items-center py-4'>
        <button
          type='button'
          onClick={onSetYearlyEvent}
          className={getStyles(false)}
        >
          {yearly
            ? 'Switch back to monthly pricing plans'
            : 'Get 2 months free (switch to yearly)'}
        </button>
      </div>

      <div className='flex flex-1 gap-3 flex-wrap-reverse md:flex-wrap'>
        <ul
          id='plans-section'
          className={`w-full md:w-auto grid nowrap md:flex-wrap xl:grid-cols-2 gap-2 list-none`}
        >
          {plans.map((planProps: any, index: number) => {
            const title = planProps.title
            const onPriceClick = () => onPlanClick(title, index)
            const textColor = getPrimaryColor(title)

            const selectedItem = index === selectedPlan

            return (
              <li className='w-full' key={title}>
                <PriceCell
                  textColor={textColor}
                  onClick={onPriceClick}
                  yearly={yearly}
                  selected={selectedItem}
                  selectHighPlans={selectHighPlans}
                  {...planProps}
                />
              </li>
            )
          })}
          <li className='w-full'>
            <div className='min-w-[330px] w-full rounded flex flex-1 flex-col justify-between border-2 px-4 py-2 border-black text-gray-700'>
              <div className='text-base'>
                All pricing is in <b>USD</b>.
              </div>
              <div className='text-sm pb-3.5'>
                Renews are auto until cancelled.
              </div>

              <button
                onClick={onTogglePlans}
                className={
                  'px-3 py-1 border-2 text-blue-600 font-bold rounded text-lg border-blue-600 hover:bg-black hover:text-white'
                }
              >
                {selectHighPlans
                  ? 'View normal plans'
                  : 'View high traffic plans'}
              </button>
            </div>
          </li>
        </ul>
        <PriceFeat
          yearly={yearly}
          title={'All plans include:'}
          details={priceConfig.feats}
          premium
        >
          {navigate ? (
            <div className='px-4 w-full'>
              <MainButton
                title={selected}
                navigate={navigate}
                yearly={yearly}
              />
            </div>
          ) : null}
        </PriceFeat>
      </div>

      <div className='font-bold text-center py-4 text-base'>
        Need more? We can easily handle thousands of scans per minute,{' '}
        <a href='mailto:support@a11ywatch.com' className='underline'>
          get in touch
        </a>{' '}
        for a quote.
      </div>
    </>
  )
}

export const Price = (props: any) => {
  return (
    <SectionContainer>
      <PriceMemo {...props} />
    </SectionContainer>
  )
}
