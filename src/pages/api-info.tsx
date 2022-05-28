import React, { Fragment, useState } from 'react'
import { Container, Button, IconButton } from '@material-ui/core'
import { NavBar, PageTitle, Link, Footer } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { UserManager, AppManager } from '@app/managers'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { GrCopy } from 'react-icons/gr'
import { API_ENDPOINT, companyName } from '@app/configs'
import { exampleBase64 } from '@app/lib/mocks/example-base64'

const apiRoutes = [
  {
    pathName: 'login',
    method: 'POST',
    params: '',
    info: 'Login to an existing account and retreives an authentication token.',
    title: 'Login',
    encodedParams: `--data-urlencode 'email=example@email.com' \ --data-urlencode 'password=dwdwd'`,
  },
  {
    pathName: 'register',
    method: 'POST',
    params: '',
    info: 'Create a new account to use and retreives an authentication token.',
    title: 'Register',
    encodedParams: `--data-urlencode 'email=example@email.com' \ --data-urlencode 'password=dwdwd'`,
  },
  {
    pathName: 'crawl',
    method: 'POST',
    params: '',
    info: 'Scan all of your domains pages at once.',
    title: 'Crawl',
    encodedParams: "--data-urlencode 'websiteUrl=https://a11ywatch.com'",
  },
  {
    pathName: 'scan-simple',
    method: 'POST',
    params: '',
    info: 'Scan a single page for issues.',
    title: 'Scan',
    encodedParams: "--data-urlencode 'websiteUrl=https://a11ywatch.com'",
  },
  {
    pathName: 'image-check',
    method: 'POST',
    params: '',
    encodedParams: `--data-urlencode 'imageBase64=${exampleBase64}'`,
    info: 'Try to determine an image using AI based on a base64 string.',
    title: 'Classify',
  },
  {
    pathName: 'report?url=https://a11ywatch.com',
    method: 'GET',
    params: '',
    encodedParams: '',
    info: 'Get the last scan ran for a web page url.',
    title: 'Last Scan',
  },
  {
    pathName: 'user',
    method: 'GET',
    params: '',
    encodedParams: '',
    info: 'Retreive your user information details.',
    title: 'User',
  },
  {
    pathName: 'website?domain=a11ywatch.com',
    method: 'GET',
    params: '',
    encodedParams: '',
    info: 'Retreive a web page information details.',
    title: 'Website',
  },
  {
    pathName: 'analytics?url=https://a11ywatch.com',
    method: 'GET',
    params: '',
    encodedParams: '',
    info: 'Retreive analytics for a web page.',
    title: 'Analytics',
  },
  {
    pathName: 'list/website?offset=0',
    method: 'GET',
    params: '',
    encodedParams: '',
    info:
      'Retreive a list of websites paginated. Request is limited to 2 websites at a time.',
    title: 'List Websites',
  },
  {
    pathName: 'list/issue?offset=0&domain=www.a11ywatch.com',
    method: 'GET',
    params: '',
    encodedParams: '',
    info:
      'Retreive a list of issues paginated. Request is limited to 100 issues at a time.',
    title: 'List Issues',
  },
]

const SectionTitle = ({ children, className, bold }: any) => {
  return (
    <h2
      className={`text-3xl ${bold ? 'font-bold' : ''}${
        className ? ' ' + className : ''
      }`}
    >
      {children}
    </h2>
  )
}

// TODO: GENERATE DOCS FROM API
function Api({ name }: PageProps) {
  const [keyVisible, setKey] = useState<boolean>(false)
  const { data = {}, loading } = userData()
  const { user } = data

  const toggleKey = () => setKey((c) => !c)

  // TODO: MOVE TO SS
  const apiLimit = !data?.user
    ? 0
    : user?.role === 0
    ? 3
    : user?.role === 1
    ? 100
    : 500

  const copyText = (text: string) => (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e?.preventDefault()
    navigator.clipboard.writeText(text)
    AppManager.toggleSnack(true, `Copied: ${text}`, 'success')
  }

  // token
  const token = UserManager?.token ? UserManager.token.trim() : ''

  return (
    <Fragment>
      <NavBar
        backButton
        title={name.toUpperCase()}
        notitle
        authenticated={!!data?.user}
      />
      <Container maxWidth='xl'>
        <Box>
          <PageTitle title={'The Web Acessibility API Documentation'} />
          <p className='text-lg'>
            In order to get started using the A11yWatch API you need to add a
            authorization header with the jwt format <b>Bearer TOKEN</b>.
          </p>
          <p className='text-lg'>
            For more information check the API{' '}
            <a
              href={'https://docs.a11ywatch.com/documentation/api'}
              target='_blank'
              rel='noreferrer'
              className='underline text-blue-600'
            >
              documentation
            </a>
            .
          </p>
          {!data?.user && loading ? (
            <TextSkeleton className={'p-2'} />
          ) : data?.user ? (
            <div className='py-2'>
              <Button
                type='button'
                onClick={toggleKey}
                variant='outlined'
                aria-label='Toggle api key visibility'
              >
                {`${keyVisible ? 'HIDE' : 'VIEW'} TOKEN`}
              </Button>
              {keyVisible ? (
                <div className={`py-2 relative`}>
                  <div className='absolute right-2 -top-12 overflow-visible'>
                    <IconButton
                      aria-label='Copy your access token to clipboard'
                      onClick={copyText(token)}
                      color='default'
                    >
                      <GrCopy title='Copy to clipboard' />
                    </IconButton>
                  </div>
                  <p className='line-clamp-3'>{token}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </Box>

        <Box className={'border rounded p-2'}>
          <SectionTitle className={'text-lg font-bold'}>
            REST API Reference Examples
          </SectionTitle>
          {!data?.user && loading ? (
            <TextSkeleton className={'p-2'} />
          ) : !data?.user ? (
            <p className={'pb-2 text-lg'}>
              <Link href={'/login'} className={'underline'}>
                Login
              </Link>{' '}
              to see your API limits and test requests using your account.
              <p>Replace the sample API key with your actual API key.</p>
            </p>
          ) : (
            <>
              <p className='text-lg'>
                Daily Allowed Usage {user?.apiUsage?.usage || 0}/{apiLimit}
              </p>
              <p className={'text-sm'}>
                Your limit will reset on your next API request if {`it's`} the
                next day.
              </p>
            </>
          )}
        </Box>

        <Box>
          <h3 className='text-2xl font-bold'>REST API Endpoints</h3>
          <h4>
            Example API endpoints for retreiving data and performing operations.
          </h4>
          <ul className='space-y-3 py-2'>
            {apiRoutes.map((route: any, i) => {
              return (
                <li
                  key={`api-route-${i}`}
                  className={'text-base border-2 p-3 rounded'}
                >
                  <h5 className='text-lg font-bold'>{route.title}</h5>
                  <h6 className='text-base'>{route.info}</h6>
                  <p className='italic text-blue-700'>Method: {route.method}</p>
                  <p className='py-1'>
                    Endpoint: {API_ENDPOINT}/{route.pathName}
                  </p>
                  <code className='border block p-2 rounded bg-black text-white text-base overflow-auto'>
                    {`curl --location --request ${
                      route.method ?? 'POST'
                    } '${API_ENDPOINT}/${route.pathName}' \
--header 'Authorization: ${keyVisible ? token : '$A11YWATCH_TOKEN'}'
${
  route.method === 'POST'
    ? `\ --header 'Content-Type: application/x-www-form-urlencoded'`
    : ''
} \
${route.encodedParams}`}
                  </code>
                </li>
              )
            })}
          </ul>
        </Box>

        <div className='border rounded inline-block px-4 py-2'>
          <p className='text-grey-600 text-lg'>
            By default, the {companyName} API Docs demonstrate using curl to
            interact with the API over HTTP. In the example replace
            a11ywatch.com with your website you want to target. Some clients are
            a work in progress as we build out the core of our system. The
            graphQl and gRPC docs will come soon.
          </p>
        </div>

        <Footer />
      </Container>
    </Fragment>
  )
}

export default metaSetter(
  { Api },
  {
    description: `Use A11yWatch's API to get the web accessibility uptime you need when you want. Rates are limited based on your membership plan.`,
    gql: true,
  }
)
