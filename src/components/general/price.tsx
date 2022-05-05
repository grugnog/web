import React, { memo, useMemo, useState } from 'react'
import { Button } from '@material-ui/core'
import { SectionContainer } from '@app/components/general'
import { priceConfig } from '@app/configs'
import { SectionHeading } from '../text'
import { Link } from './link'
import { GrFormCheckmark } from 'react-icons/gr'

const getStyles = (inactive: boolean) =>
  inactive
    ? 'shadow relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-500 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 hover:bg-gray-200'
    : 'relative w-1/2 bg-gray-100 border border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-white bg-black whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-gray-500 focus:z-10 sm:w-auto sm:px-8'

const highLight = (
  name: string = '',
  highLightStyles: any,
  { basic, premium }: any
) =>
  (basic && name === 'Basic') || (premium && name === 'Premium')
    ? highLightStyles
    : ''

const getPrimaryColor = (title: string) => {
  let color = '#000'
  if (title === 'Premium') {
    color = '#8956ef'
  } else if (title === 'Free') {
    color = '#00875b'
  } else if (title === 'Basic') {
    color = '#2b72e6'
  } else if (title === 'Enterprise') {
    color = '#000'
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
      <Button
        component={Link}
        className={`w-full hover:ring`}
        style={{
          backgroundColor: buttonColor,
          color: textColor,
          fontWeight: 800,
        }}
        href={
          title === 'Enterprise'
            ? '/contact'
            : `/register?plan=${title}${yearly ? '&yearly=true' : ''}`
        }
      >
        {title === 'Enterprise' ? 'Contact Us' : `${title} Start`}
      </Button>
    )
  }

  return null
}

const openMail = () => {
  if (typeof window !== 'undefined') {
    const mailLink =
      'mailto:support@a11ywatch.com' +
      '?subject=' +
      encodeURI('Enterprise Plan') +
      '&body=' +
      'I would like to find out more about the enterprise plan.'

    window.location.href = mailLink
  }
}

function PriceWrapper({
  basic = false,
  premium = false,
  onClick,
  blockFree,
  navigate,
  yearly: year,
  setYearly: setYear,
  pricingPage,
}: any) {
  const [yearly, onSetYear] = useState<boolean>(!!year)

  const setYearly = (params: any) => {
    if (typeof setYear === 'function') {
      setYear(params)
    }
    onSetYear(params)
  }

  const plans = useMemo(
    () =>
      priceConfig.plans.filter((item: any) =>
        !blockFree ? item.title !== 'Free' : true
      ),
    [blockFree]
  )

  const SubHeading = ({ children, ...extra }: any) =>
    pricingPage ? (
      <h3 {...extra}>{children}</h3>
    ) : (
      <h4 {...extra}> {children}</h4>
    )

  // feature with plan
  const Description = ({ children, ...extra }: any) =>
    pricingPage ? (
      <h4 {...extra}>{children}</h4>
    ) : (
      <h5 {...extra}>{children}</h5>
    )

  return (
    <div id='plans-section'>
      {typeof onClick === 'undefined' && !pricingPage ? (
        <>
          <SectionHeading style={onClick ? { fontWeight: 200 } : {}}>
            {navigate ? 'Plans for everyone' : 'Pricing'}
          </SectionHeading>
          <p className='pb-2 text-xl'>
            Flexible plans that can be adjusted anytime.
          </p>
        </>
      ) : null}
      <div className='flex sm:mt-6 py-4 space-x-1'>
        <button
          type='button'
          onClick={() => {
            setYearly(false)
          }}
          className={getStyles(yearly)}
        >
          Monthly billing
        </button>
        <button
          type='button'
          onClick={() => {
            setYearly(true)
          }}
          className={getStyles(!yearly)}
        >
          Yearly billing
        </button>
      </div>
      <div className={`grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-4`}>
        {plans.map(({ title, details, cost, costYearly }: any) => {
          const clickEvent =
            title === 'Enterprise' && !navigate ? openMail : onClick

          const Component = clickEvent ? 'button' : 'div'

          const textColor = getPrimaryColor(title)

          return (
            <Component
              key={title}
              className={`rounded flex flex-col justify-between ${highLight(
                title,
                'bg-blue-100 text-black',
                {
                  premium,
                  basic,
                }
              )} border border-gray-300 ${
                clickEvent ? `hover:bg-blue-100` : ''
              } rounded`}
              onClick={clickEvent ? () => clickEvent(title) : undefined}
            >
              <>
                <div className='w-full'>
                  <div
                    className='text-left w-full flex-col text-white px-8 py-3'
                    style={{ backgroundColor: textColor }}
                  >
                    <SubHeading className='text-3xl font-bold'>
                      <span>{title}</span>
                      {cost ? (
                        <span className={'text-lg font-semibold block'}>
                          {yearly ? costYearly : cost}
                        </span>
                      ) : null}
                    </SubHeading>
                  </div>

                  <ul className='px-4 space-y-1 py-4'>
                    {details?.map((item: string, i: number) => (
                      <li
                        className={'flex gap-x-3 place-items-center text-left'}
                        key={`${item}-${i}`}
                        aria-hidden={!String(item).trim()}
                      >
                        <div
                          className='rounded-xl text-white stroke-white'
                          style={{
                            backgroundColor: textColor,
                          }}
                        >
                          <GrFormCheckmark className='grIcon' />
                        </div>
                        <Description className='text-lg'>{item}</Description>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className='px-4 py-2'>
                  <MainButton
                    title={title}
                    navigate={navigate}
                    yearly={yearly}
                  />
                  <div
                    className='pt-1'
                    style={{ textAlign: 'center', fontSize: '0.95em' }}
                  >
                    {title !== 'Free' ? 'Cancel anytime.' : 'Forever Free'}
                  </div>
                </div>
              </>
            </Component>
          )
        })}
      </div>
    </div>
  )
}

export const PriceMemo = memo(PriceWrapper)

export const PriceContainer = (props: any) => {
  return (
    <SectionContainer>
      <PriceMemo {...props} />
    </SectionContainer>
  )
}

export const Price = memo(PriceContainer)
