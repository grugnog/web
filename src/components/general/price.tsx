/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { Typography, Grid, Button, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Ribbon } from '@app/components/general'
import { priceConfig } from '@app/configs'
import { SectionHeading } from '../text'
import { Link } from './link'

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: '12%',
    paddingBottom: '12%',
  },
  container: {
    flexGrow: 1,
  },
  icon: {
    fontSize: '40px',
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    flexGrow: 1,
    minHeight: '25vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 4,
    padding: 20,
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
}))

export function Price({
  basic = false,
  premium = false,
  onClick,
  blockFree,
  navigate,
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

  return (
    <Container className={!onClick && !navigate ? classes.root : ''}>
      {typeof onClick === 'undefined' ? (
        <SectionHeading gutterBottom style={onClick ? { fontWeight: 200 } : {}}>
          {navigate ? 'Plans' : 'Pricing'}
        </SectionHeading>
      ) : null}
      <Grid container spacing={1} className={!onClick ? classes.container : ''}>
        {priceConfig.plans
          .filter((item: any) => (!blockFree ? item.title !== 'Free' : true))
          .map(({ title, details, cost, Icon }: any) => (
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
              onClick={onClick ? onClick(title) : undefined}
              component={onClick ? 'button' : 'div'}
            >
              <Fragment>
                {title === 'Premium' ? <Ribbon /> : null}
                <Icon fontSize='large' />
                <Typography
                  variant='h4'
                  component='span'
                  gutterBottom
                  style={{ fontWeight: 'bold' }}
                >
                  {title}
                </Typography>
                <ol>
                  {details?.map((item: any) => (
                    <Typography variant='subtitle1' component='li' key={item}>
                      - {item}
                    </Typography>
                  ))}
                </ol>
                {cost ? (
                  <Typography
                    variant='h5'
                    component='span'
                    style={{ fontWeight: 600, marginTop: 12 }}
                  >
                    {cost}
                  </Typography>
                ) : null}
                {navigate ? (
                  <Button
                    style={{ marginTop: 10, fontWeight: 600 }}
                    component={Link}
                    href={`/register?plan=${title}`}
                  >{`${title} Start`}</Button>
                ) : null}
                <Typography
                  variant='subtitle2'
                  component='p'
                  style={{ marginTop: 12, textAlign: 'center' }}
                >
                  {title !== 'Free' ? 'Cancel anytime.' : 'Forever Free'}
                </Typography>
              </Fragment>
            </Paper>
          ))}
      </Grid>
      <div className={classes.center}>
        <Typography
          variant='subtitle1'
          component='p'
          style={{ marginTop: 12, textAlign: 'center' }}
        >
          If you need a higher API limit please send us an email at
          support@a11ywatch.com
        </Typography>
      </div>
    </Container>
  )
}
