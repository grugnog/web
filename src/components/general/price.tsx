import { useMemo, useState } from 'react'
import { priceConfig } from '@app/configs'

import { SectionHeading } from '../text'
import { Link } from './link'
import { SectionContainer } from '@app/app/containers/section-container'
import { PriceCell } from './cells/price-cell'

const getStyles = (inactive: boolean) =>
  inactive
    ? 'relative px-2 border rounded-2xl py-2 text-sm font-medium text-gray-700 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 hover:shadow-xl'
    : 'relative px-2 rounded-2xl shadow-sm py-2 text-sm font-medium text-white bg-[#2A2A2A] whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-500 focus:z-10 sm:w-auto sm:px-8'

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
      <div className='pt-6 pb-2 justify-center flex'>
        <Link
          className={`w-[12rem] px-4 py-3 hover:ring rounded-3xl font-bold text-center`}
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
  basic = false,
  premium = false,
  free = false,
  // main props
  onClick,
  blockFree,
  navigate,
  yearly: year,
  setYearly: setYear,
  pricingPage,
}: any) {
  const [yearly, onSetYear] = useState<boolean>(!!year)
  const [selectedPlan, onSelectPlan] = useState<string>('Basic')

  const setYearly = (params: any) => {
    if (typeof setYear === 'function') {
      setYear(params)
    }
    onSetYear(params)
  }

  const onSetYearlyEvent = () => {
    setYearly((x: boolean) => !x)
  }

  const plans = useMemo(() => {
    const basePlans = priceConfig.plans.filter((item: any) =>
      blockFree ? item.title !== 'Free' : true
    )

    return basePlans
  }, [blockFree])

  const xlColumns = !onClick ? 'xl:grid-cols-4' : `xl:grid-cols-${plans.length}`

  const onPlanClick = (title: string) => {
    if (typeof onClick === 'function') {
      onClick(title)
    }
    onSelectPlan(title)
  }

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

      <div className='flex flex-col flex-1'>
        <div
          id='plans-section'
          className={`flex flex-1 gap-2 nowrap ${xlColumns} overflow-x-auto`}
        >
          {plans.map((planProps: any) => {
            const title = planProps.title
            const onPriceClick = () => onPlanClick(title)
            const textColor = getPrimaryColor(title)

            return (
              <PriceCell
                key={title}
                textColor={textColor}
                onClick={onPriceClick}
                basic={basic || selectedPlan === 'Basic'}
                free={free || selectedPlan === 'Free'}
                premium={premium || selectedPlan === 'Premium'}
                yearly={yearly}
                {...planProps}
              />
            )
          })}
        </div>
      </div>

      {navigate && selectedPlan ? (
        <div className='px-4 py-2 w-full'>
          <MainButton
            title={selectedPlan}
            navigate={navigate}
            yearly={yearly}
          />
        </div>
      ) : null}

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
