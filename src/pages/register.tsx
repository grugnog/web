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
  const { plan: p, yearly } = params ?? {}
  const registerStart = 'A11yWatch - Register'
  const lengthText = `${yearly ? 'yearly' : 'monthly'} plan`

  const plan = String(p).toLowerCase()

  if (plan === 'free') {
    return `${registerStart} free ${lengthText}`
  }
  if (plan === 'basic') {
    return `${registerStart} basic ${lengthText}`
  }
  if (plan === 'premium') {
    return `${registerStart} premium ${lengthText}`
  }

  return registerStart
}

const getDescription = (params?: RegisterParams) => {
  const { plan: p, yearly } = params ?? {}
  const registerStart =
    'Register with A11yWatch to get web accessibility insight on demand'

  const lengthText = `${yearly ? 'yearly' : 'monthly'} plan`
  const plan = String(p).toLowerCase()

  if (plan === 'free') {
    return `${registerStart} free ${lengthText}. Get help making your website target everyone.`
  }
  if (plan === 'basic') {
    return `${registerStart} basic ${lengthText}. Get the support you need to make your website inclusive.`
  }
  if (plan === 'premium') {
    return `${registerStart} premium ${lengthText}. Get the best support you need to make your website accessible.`
  }

  return `${registerStart}.`
}

function Register({ name }: PageProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title key='title'>{getTitle(router?.query)}</title>
        <meta
          name='description'
          content={getDescription(router?.query)}
          key='description'
        />
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

export default metaSetter({ Register })
