/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useCallback } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { useMediaQuery } from '@material-ui/core'
import { strings } from '@app-strings'
import { useSearch } from '@app/data'
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
  const { toggleModal } = useSearch()
  const clickItem = useCallback(
    (item: string) => {
      toggleModal(true, item)
    },
    [toggleModal]
  )
  const size = useMediaQuery('(min-width:600px)') ? 78 : 25

  return (
    <SectionContainer className={'bg-gray-100'}>
      <SectionHeading>{strings.customers}</SectionHeading>
      <Typography variant='h6' component='h4' gutterBottom>
        {strings.customersWhy}
      </Typography>
      <div className={classes.card}>
        {['twitter', 'github', 'dropbox'].map((item, i) => (
          <button
            onClick={() => clickItem(`https://${item}.com`)}
            aria-label={`Scan ${item} for issues`}
            key={item + i}
            style={{ border: 0 }}
            className={classes.badge}
          >
            <Image
              src={`/static/img/${item}.svg`}
              alt={item}
              width={size}
              height={size}
            />
          </button>
        ))}
      </div>
    </SectionContainer>
  )
}
