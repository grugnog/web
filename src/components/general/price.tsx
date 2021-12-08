/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, memo, useState } from 'react'
import { Typography, Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Ribbon, SectionContainer } from '@app/components/general'
import { priceConfig } from '@app/configs'
import { SectionHeading } from '../text'
import { Link } from './link'
import { Done } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  container: {
    flexGrow: 1,
  },
  icon: {
    fontSize: '40px',
  },
  paper: {
    flexGrow: 1,
    minHeight: '25vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: 8,
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'pre-wrap',
    margin: 2,
  },
}))

const getStyles = (inactive: boolean) =>
  inactive
    ? 'ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8'
    : 'relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8'

const highLight = (
  name: string = '',
  highLightStyles: any,
  { basic, premium }: any
) =>
  (basic && name === 'Basic') || (premium && name === 'Premium')
    ? highLightStyles
    : ''

const getPrimaryColor = (title: string) => {
  let textColor = '#fff'
  if (title === 'Premium') {
    textColor = '#EC4899'
  } else if (title === 'Free') {
    textColor = '#10B981'
  } else if (title === 'Basic') {
    textColor = '#3B82F6'
  } else if (title === 'Enterprise') {
    textColor = '#fff'
  }
  return textColor
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
  const classes = useStyles()
  const [yearState, onSetYear] = useState<boolean>(!!year)
  const Container = !onClick ? 'section' : 'div'

  const setYearly = (params: any) => {
    if (typeof setYear === 'function') {
      setYear(params)
    }
    onSetYear(params)
  }

  const yearly = yearState

  function MainButton({ title }: { title: string }) {
    const buttonColor = getPrimaryColor(title)
    let textColor = '#fff'

    if (title === 'Premium') {
    } else if (title === 'Free') {
    } else if (title === 'Basic') {
      textColor = '#fff'
    } else if (title === 'Enterprise') {
      textColor = '#000'
    }

    if (navigate) {
      return (
        <Button
          component={Link}
          className={`w-full hover:ring`}
          style={{
            backgroundColor: buttonColor,
            color: textColor,
            fontWeight: 600,
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

  return (
    <Container className={!onClick && !navigate ? '' : ''}>
      {typeof onClick === 'undefined' && !pricingPage ? (
        <SectionHeading gutterBottom style={onClick ? { fontWeight: 200 } : {}}>
          {navigate ? 'Plans' : 'Pricing'}
        </SectionHeading>
      ) : null}
      <div className='flex sm:mt-6 py-4'>
        <button
          type='button'
          onClick={() => setYearly(false)}
          className={getStyles(yearly)}
        >
          Monthly billing
        </button>
        <button
          type='button'
          onClick={() => setYearly(true)}
          className={getStyles(!yearly)}
        >
          Yearly billing
        </button>
      </div>
      <Grid
        container
        spacing={1}
        className={`${!onClick ? classes.container : ''} overflow-visible`}
      >
        {priceConfig.plans
          .filter((item: any) => (!blockFree ? item.title !== 'Free' : true))
          .map(({ title, details, cost, costYearly, Icon }: any) => {
            const clickEvent =
              title === 'Enterprise' && !navigate
                ? () => {
                    if (typeof window !== 'undefined') {
                      const mailLink =
                        'mailto:support@a11ywatch.com' +
                        '?subject=' +
                        encodeURIComponent('Enterprise Plan') +
                        '&body=' +
                        'I would like to find out more about the enterprise plan.'

                      window.location.href = mailLink
                    }
                  }
                : onClick

            const isPremium = title === 'Premium'
            const Component = clickEvent ? 'button' : 'div'

            const textColor = getPrimaryColor(title)

            return (
              <Component
                key={title}
                className={`${classes.paper} rounded ${highLight(
                  title,
                  'bg-gray-100 text-black',
                  {
                    premium,
                    basic,
                  }
                )} border border-white text-white'`}
                style={{
                  borderTopColor: textColor,
                  borderTopWidth: 3,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 1,
                }}
                onClick={clickEvent ? () => clickEvent(title) : undefined}
              >
                <Fragment>
                  {isPremium ? (
                    <Ribbon backgroundColor={textColor} color={'#fff'} />
                  ) : null}
                  <Icon fontSize='large' style={{ color: textColor }} />
                  <Typography
                    variant='h4'
                    component='h4'
                    gutterBottom
                    style={{ fontWeight: 'bold', color: textColor }}
                  >
                    {title}
                  </Typography>
                  <ul>
                    {details?.map((item: string) => (
                      <li
                        className={'flex gap-x-3 place-items-center'}
                        key={item}
                        aria-hidden={!String(item).trim()}
                      >
                        {String(item).trim() ? <Done /> : null}
                        <Typography component={'h3'}>{item}</Typography>
                      </li>
                    ))}
                  </ul>
                  {cost ? (
                    <Typography
                      variant='h5'
                      className={'py-6'}
                      component={'h4'}
                    >
                      {yearly ? costYearly : cost}
                    </Typography>
                  ) : null}
                  <MainButton title={title} />
                  <Typography
                    variant='subtitle2'
                    component='div'
                    className={'pt-4'}
                    style={{ textAlign: 'center', fontSize: '0.95em' }}
                  >
                    {title !== 'Free' ? 'Cancel anytime.' : 'Forever Free'}
                  </Typography>
                </Fragment>
              </Component>
            )
          })}
      </Grid>
      <Typography
        variant='subtitle1'
        component='p'
        className={'py-12 text-center'}
      >
        If you need a higher API limit please send us an email at
        support@a11ywatch.com
      </Typography>
    </Container>
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
