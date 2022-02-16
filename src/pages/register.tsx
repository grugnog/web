/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { SignOnForm, MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { MarketingShortTitle } from '@app/components/marketing'

type Plan = 'Free' | 'Basic' | 'Premium' | string
interface RegisterParams {
  yearly?: boolean
  plan?: Plan | Plan[]
}

const getTitle = (params?: RegisterParams) => {
  const { plan, yearly } = params ?? {}
  const registerStart = 'A11yWatch - Register'
  const lengthText = `${yearly ? 'yearly' : 'monthly'} plan`

  if (plan === 'Free') {
    return `${registerStart} free ${lengthText}`
  }
  if (plan === 'Basic') {
    return `${registerStart} basic ${lengthText}`
  }
  if (plan === 'Premium') {
    return `${registerStart} premium ${lengthText}`
  }

  return registerStart
}

const getDescription = (params?: RegisterParams) => {
  const { plan, yearly } = params ?? {}
  const registerStart =
    'Register with a11ywatch to get web accessibility insight on demand'

  const lengthText = `${yearly ? 'yearly' : 'monthly'} plan`

  if (plan === 'Free') {
    return `${registerStart} free ${lengthText}. Get the help making your website accessible.`
  }
  if (plan === 'Basic') {
    return `${registerStart} basic ${lengthText}. Get the support you need to make your website accessible`
  }
  if (plan === 'Premium') {
    return `${registerStart} premium ${lengthText}. Get the best support you need to make your website accessible`
  }

  return `${registerStart}.`
}

function Register({ name }: PageProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{getTitle(router?.query)}</title>
        <meta
          name='description'
          content={getDescription(router?.query)}
          key='description'
        />
        {router?.query ? <meta name='robots' content='noindex' /> : null}
      </Head>
      <MarketingDrawer
        title={name}
        maxWidth='sm'
        footerSpacing
        emptyFooter
        emptyNav
      >
        <MarketingShortTitle />
        <SignOnForm />
      </MarketingDrawer>
    </>
  )
}

export default metaSetter(
  { Register },
  {
    gql: true,
  }
)
