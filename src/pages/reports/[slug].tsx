import type { PageProps } from '@app/types'
import type { GetServerSideProps } from 'next'
import { Fragment } from 'react'
import Head from 'next/head'
import {
  ErrorBoundary,
  MarketingDrawer,
  PageTitle,
} from '@app/components/general'
import { ReportView } from '@app/components/ada'
import { metaSetter } from '@app/utils'
import { getAPIRoute } from '@app/configs/api-route'
import { useAuthContext } from '@app/components/providers/auth'

function Reports({ name, website }: PageProps) {
  const { url, domain } = website ?? { domain: '', url: 'Not Found' }
  const { authed: authenticated } = useAuthContext()

  return (
    <Fragment>
      <Head>
        <title>{`Web Accessibility Report - ${url} | A11yWatch`}</title>
        <meta
          property='description'
          content={`A detailed web accessibility report for ${url}. The report follows ADA and WCAG specifications.`}
          key='description'
        />
      </Head>
      <MarketingDrawer
        title={url || name}
        maxWidth='xl'
        initClosed={true}
        authenticated={authenticated}
      >
        <div className='sr-only'>
          <PageTitle>{`Report: ${domain || 'page'}`}</PageTitle>
        </div>
        <ErrorBoundary>
          <ReportView
            website={website}
            disablePlayground
            disableTabs
            download
            authenticated={authenticated}
          />
        </ErrorBoundary>
      </MarketingDrawer>
    </Fragment>
  )
}

const baseUrl = getAPIRoute('api', true)

// get the report for a website
const getWebsite = async (url: string, jwt?: string) => {
  let website
  let res

  try {
    res = await fetch(
      `${baseUrl}/get-website?q=${url}`,
      jwt ? { headers: { Authorization: jwt } } : undefined
    )
  } catch (e) {
    console.error(e)
  }

  try {
    if (res && res?.ok) {
      website = await res.json()
    }
  } catch (e) {
    console.error(e)
  }

  return website
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params ?? {}
  const { jwt } = context.req.cookies
  let url: string | undefined = ''
  let website

  // if an array for dynamic routes.
  if (slug && Array.isArray(slug) && slug.length) {
    const [base] = slug

    if (base) {
      url = base
    }
  } else {
    url = slug + ''
  }

  if (url.startsWith('pageUrl=')) {
    url = url.replace('pageUrl=', '')
  }

  if (!url) {
    return {
      notFound: true,
    }
  }

  try {
    website = await getWebsite(url, jwt)
  } catch (e) {
    console.error(e)
  }

  if (!website) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: { website },
  }
}

export default metaSetter(
  { Reports },
  {
    gql: true,
    description:
      'Website detailed report with accessibility issues and how to fix.',
  }
)
