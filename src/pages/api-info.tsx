import React, { Fragment, useState } from 'react'
import { Container } from '@material-ui/core'
import {
  NavBar,
  PageTitle,
  Link,
  Footer,
  Button,
} from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { UserManager, AppManager } from '@app/managers'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { GrCopy } from 'react-icons/gr'
import { companyName } from '@app/configs'
import { apiRoutes } from '@app/templates/rest-api'
import { ApiCell } from '@app/components/general/cells/api-info-cell'

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

  const authed = !!data?.user

  return (
    <Fragment>
      <NavBar
        backButton={authed}
        title={name.toUpperCase()}
        notitle
        authenticated={authed}
      />
      <Container maxWidth='xl'>
        <Box>
          <PageTitle title={'Web Accessibility API'} />
          <SectionTitle className={'text-lg font-bold'}>
            The free web accessibility API built to handle large workloads.
          </SectionTitle>
          <p className='text-lg'>
            In order to get started using the A11yWatch API you need to add your
            authorization header with the JWT format <b>Bearer TOKEN</b>.
          </p>
          <p className='text-lg'>
            For more information go to the{' '}
            <a
              href={'https://docs.a11ywatch.com/documentation/api'}
              target='_blank'
              rel='noreferrer'
              className='underline text-blue-600'
            >
              documentation
            </a>
            . You can also use the API in{' '}
            <a
              href={'https://api.a11ywatch.com/playground'}
              target='_blank'
              rel='noreferrer'
              className='underline text-blue-600'
            >
              graphQL
            </a>
            .
          </p>
          {!data?.user && loading ? (
            <TextSkeleton className={'p-2'} />
          ) : data?.user ? (
            <div className='py-2'>
              <span id='toggle-key' className='sr-only'>
                Toggle the visibility of your authentication token
              </span>
              <Button
                type='button'
                onClick={toggleKey}
                aria-labelledby={'togle-key'}
              >
                {`${keyVisible ? 'Hide' : 'View'} Token`}
              </Button>
              {keyVisible ? (
                <div className={`py-2 relative`}>
                  <div className='absolute right-2 -top-12 overflow-visible'>
                    <span id='copy-text' className='sr-only'>
                      Copy your authentication token to clipboard
                    </span>
                    <button
                      className='p-3 rounded border-2'
                      aria-labelledby='copy-text'
                      onClick={copyText(token)}
                    >
                      <GrCopy title='Copy to clipboard' />
                    </button>
                  </div>
                  <p className='line-clamp-3'>{token}</p>
                </div>
              ) : null}
            </div>
          ) : null}
        </Box>

        <Box className={'border rounded p-2'}>
          <p className={'text-lg font-bold'}>REST Reference Examples</p>
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
          <ul className='space-y-3 py-2'>
            {apiRoutes.map((ro) => {
              const routeID = String(ro.title)
                ?.replace(' ', '')
                ?.replace(' ', '')
                ?.replace(' ', '')
                .toLowerCase()

              return (
                <li key={ro.title} id={routeID}>
                  <div className='py-4'>
                    <div className='py-2 px-4 color-[#0E1116] border-l-4 border-[#0E1116] rounded'>
                      <h3 className='text-3xl font-bold'>
                        <a href={`#${routeID}`}>{ro.title}</a>
                      </h3>
                    </div>
                  </div>
                  <ul className='space-y-3 py-2'>
                    {ro.routes.map((route: any, i) => {
                      return (
                        <ApiCell
                          key={`apiinfo-route-${i}`}
                          route={route}
                          token={token}
                          keyVisible={keyVisible}
                        />
                      )
                    })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </Box>

        <div className='border-2 rounded inline-block px-4 py-2'>
          <p className='text-grey-600 text-lg'>
            By default, the {companyName} API Docs demonstrate using curl to
            interact with the API over HTTP. Most routes allow params to be sent
            from the url or the body. Its best to stick to using the body for
            PUTS and POST request since some params are set to be arrays and
            other none string shapes. In the example replace a11ywatch.com with
            your website you want to target. Some clients are a work in progress
            as we build out the core of our system.
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
    title: 'Web Accessibility API  - A11yWatch',
    description: `The web accessibility API for testing in real time. Rates are limited based on your membership plan.`,
    gql: true,
  }
)
