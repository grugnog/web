import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'
import { SectionHeading } from '../text'
import { SectionContainer } from '../general'
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
  card: {
    position: 'relative',
    overflow: 'hidden',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'space-around',
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
  },
  badge: {
    height: 78,
    width: 78,
    [theme.breakpoints.down('sm')]: {
      width: 25,
      height: 25,
    },
  },
}))

export function CtaCustomers() {
  const classes = useStyles()

  return (
    <SectionContainer>
      <SectionHeading>{strings.customers}</SectionHeading>
      <Typography variant='h6' component='h4' gutterBottom>
        {strings.customersWhy}
      </Typography>
      <div className={classes.card}>
        {['twitter', 'github', 'dropbox'].map((item, i) => (
          <div
            aria-label={`${item} logo`}
            key={item + i}
            style={{ border: 0 }}
            className={classes.badge}
          >
            <Image src={`/img/${item}.svg`} alt={item} width={78} height={78} />
          </div>
        ))}
      </div>
    </SectionContainer>
  )
}
