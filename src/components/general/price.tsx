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
    ? 'ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-500 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8 hover:bg-gray-200'
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
  const [yearly, onSetYear] = useState<boolean>(!!year)

  const setYearly = (params: any) => {
    if (typeof setYear === 'function') {
      setYear(params)
    }
    onSetYear(params)
  }

  function MainButton({ title }: { title: string }) {
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

  return (
    <div className={!onClick && !navigate ? '' : ''} id='plans-section'>
      {typeof onClick === 'undefined' && !pricingPage ? (
        <>
          <SectionHeading style={onClick ? { fontWeight: 200 } : {}}>
            {navigate ? 'Plans for everyone' : 'Pricing'}
          </SectionHeading>
          <Typography variant='h6' component='p' gutterBottom>
            Flexible plans that can be adjusted anytime
          </Typography>
        </>
      ) : null}
      <div className='flex sm:mt-6 py-4'>
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
                )} border border-gray-300 ${
                  clickEvent ? `hover:bg-blue-100` : ''
                }`}
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
                        className={'flex gap-x-3 place-items-center text-left'}
                        key={item}
                        aria-hidden={!String(item).trim()}
                      >
                        {String(item).trim() ? <Done /> : null}
                        <Typography component={pricingPage ? 'h3' : 'h5'}>
                          {item}
                        </Typography>
                      </li>
                    ))}
                  </ul>
                  {cost ? (
                    <h4 className={'py-2 text-3xl font-bold'}>
                      {yearly ? costYearly : cost}
                    </h4>
                  ) : null}
                  <MainButton title={title} />
                  <div
                    className='pt-1'
                    style={{ textAlign: 'center', fontSize: '0.95em' }}
                  >
                    {title !== 'Free' ? 'Cancel anytime.' : 'Forever Free'}
                  </div>
                </Fragment>
              </Component>
            )
          })}
      </Grid>
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
