import React, { Fragment } from 'react'
import { Typography } from '@material-ui/core'
import { strings } from '@app-strings'
import { SectionHeading } from '../text'
import { SectionContainer } from '../general'
import Image from 'next/image'

export function CtaCustomers() {
  return (
    <SectionContainer>
      <SectionHeading>{strings.customers}</SectionHeading>
      <Typography variant='h6' component='h4' gutterBottom>
        {strings.customersWhy}
      </Typography>
      <div className={'border flex w-full p-5 justify-around'}>
        {['twitter', 'github', 'dropbox'].map((item, i) => (
          <Fragment key={item + i}>
            <Image
              src={`/img/${item}.svg`}
              alt={`${item} logo`}
              width={62}
              height={62}
            />
          </Fragment>
        ))}
      </div>
    </SectionContainer>
  )
}
