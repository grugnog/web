import { SignOnForm, MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Head from 'next/head'
import { MarketingShortTitle } from '@app/components/marketing'
import type { GetServerSideProps } from 'next'

interface RegisterParams {
  yearly?: boolean
  plan?: string
}

const getTitle = (params?: RegisterParams) => {
  const { plan: p, yearly: y } = params ?? {}
  const yearly = y ? String(y).toLowerCase() : ''
  const plan = p ? String(p).toLowerCase() : ''

  const registerStart = 'A11yWatch - Register'
  const lengthText = `${yearly ? 'yearly' : 'monthly'} plan`

  if (plan === 'free') {
    return `${registerStart} free ${lengthText}`
  }
  if (plan === 'basic') {
    return `${registerStart} basic ${lengthText}`
  }
  if (plan === 'premium') {
    return `${registerStart} premium ${lengthText}`
  }

  if (plan) {
    const tier = plan[0] === 'H' ? 'High tier' : 'Normal tier'

    return `${tier} ${plan} ${lengthText}`
  }

  return registerStart
}

const getDescription = (params?: RegisterParams) => {
  const { plan: p, yearly: y } = params ?? {}
  const yearly = y ? String(y).toLowerCase() : ''
  const plan = p ? String(p).toLowerCase() : ''

  const registerStart =
    'Register to get web accessibility insight on demand, dedicated monitoring, and more'

  const lengthText = `${yearly ? 'yearly' : 'monthly'} plan`

  if (plan === 'free') {
    return `${registerStart} free. Get help making your website target everyone.`
  }
  if (plan === 'basic') {
    return `${registerStart} with the basic ${lengthText}.`
  }
  if (plan === 'premium') {
    return `${registerStart} with the premium ${lengthText}.`
  }

  if (plan) {
    const tier = plan[0] === 'H' ? 'High tier' : 'Normal tier'

    return `${registerStart} with ${tier} ${plan} ${lengthText}`
  }

  return `${registerStart}.`
}

function Register({
  name,
  title,
  description,
}: PageProps & { description: string; title: string }) {
  return (
    <>
      <Head>
        <title key='title'>{title}</title>
        <meta name='description' content={description} key='description' />
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res, query } = context

  res.setHeader('Cache-Control', 'public, s-maxage=604800, immutable')

  const title = getTitle(query)
  const description = getDescription(query)

  return {
    props: {
      title,
      description,
    },
  }
}

export default metaSetter({ Register }, { gql: true })
