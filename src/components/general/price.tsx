/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, memo } from 'react'
import { Typography, Grid, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Ribbon } from '@app/components/general'
import { priceConfig } from '@app/configs'
import { SectionHeading } from '../text'
import { Link } from './link'
import { Done } from '@material-ui/icons'

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
  },
  container: {
    flexGrow: 1,
    overflow: 'hidden',
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
    margin: 4,
    padding: 12,
    border: 0,
    overflow: 'hidden',
    position: 'relative',
    whiteSpace: 'pre-wrap',
  },
  highLight: {
    boxShadow: 'inset 0px 0px 0px 5px rgba(130,130,130,0.4)',
  },
  large: {
    minHeight: '40vh',
  },
  dot: {
    top: '-0.4rem',
  },
}))

const getStyles = (inactive: boolean) =>
  inactive
    ? 'ml-0.5 relative w-1/2 border border-transparent rounded-md py-2 text-sm font-medium text-gray-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8'
    : 'relative w-1/2 bg-white border-gray-200 rounded-md shadow-sm py-2 text-sm font-medium text-gray-900 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:z-10 sm:w-auto sm:px-8'

function PriceWrapper({
  basic = false,
  premium = false,
  onClick,
  blockFree,
  navigate,
  yearly,
  setYearly,
}: any) {
  const classes = useStyles()
  const Container = !onClick ? 'section' : 'div'

  const highLight = (
    name: string = '',
    highLightStyles: any,
    { basic, premium }: any
  ) =>
    (name === 'Basic' && basic) || (name === 'Premium' && premium)
      ? highLightStyles
      : ''

  function MainButton({ title }: { title?: string }) {
    if (navigate) {
      return (
        <Button
          component={Link}
          className={'w-full text-bold'}
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
    <Container className={!onClick && !navigate ? classes.root : ''}>
      {typeof onClick === 'undefined' ? (
        <SectionHeading gutterBottom style={onClick ? { fontWeight: 200 } : {}}>
          {navigate ? 'Plans' : 'Pricing'}
        </SectionHeading>
      ) : null}
      <div className={'py-4'}>
        <div className='relative self-center mt-6 rounded-lg p-0.5 flex sm:mt-8'>
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
      </div>
      <Grid container spacing={1} className={!onClick ? classes.container : ''}>
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

            return (
              <Paper
                key={title}
                className={`${classes.paper} ${highLight(
                  title,
                  classes?.highLight,
                  {
                    premium,
                    basic,
                  }
                )}`}
                onClick={clickEvent ? () => clickEvent(title) : undefined}
                component={clickEvent ? 'button' : 'div'}
              >
                <Fragment>
                  {title === 'Premium' ? <Ribbon /> : null}
                  <Icon
                    fontSize='large'
                    style={title === 'Enterprise' ? { color: '#5c6bc0' } : {}}
                  />
                  <Typography
                    variant='h4'
                    component='h4'
                    gutterBottom
                    style={{ fontWeight: 'bold' }}
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
              </Paper>
            )
          })}
      </Grid>
      <Typography
        variant='subtitle1'
        component='p'
        className={'py-6 text-center'}
      >
        If you need a higher API limit please send us an email at
        support@a11ywatch.com
      </Typography>
    </Container>
  )
}

export const Price = memo(PriceWrapper)
