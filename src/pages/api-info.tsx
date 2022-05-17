import React, { Fragment, useState } from 'react'
import { Container, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NavBar, PageTitle, Link, Footer } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { UserManager, AppManager } from '@app/managers'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { GrCopy } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  payments: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  email: {
    marginBottom: theme.spacing(2),
  },
  italic: {
    fontStyle: 'italic',
  },
}))

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
  const classes = useStyles()
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
      <Container maxWidth='xl' className={classes.root}>
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
            <TextSkeleton className={classes.email} />
          ) : data?.user ? (
            <div>
              <Button
                className={classes.payments}
                type='button'
                onClick={toggleKey}
                variant='outlined'
                aria-label='Toggle api key visibility'
              >
                {`${keyVisible ? 'HIDE' : 'VIEW'} TOKEN`}
              </Button>
              {keyVisible ? (
                <div className={`${classes.container} relative`}>
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

        <Box>
          <SectionTitle variant='subtitle1' bold>
            REST web accessibility and vitals endpoints.
          </SectionTitle>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
          ) : !data?.user ? (
            <p className={'pb-2 text-lg'}>
              <Link href={'/login'} className={'underline'}>
                Login
              </Link>{' '}
              to see your API limits.
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
          <h3 className='text-2xl font-bold'>API Endpoints</h3>
          <h4 className='text-xl py-2'>Single page website scan.</h4>
          <h5 className='py-1'>
            Endpoint: https://api.a11ywatch.com/api/scan-simple
          </h5>
          <code className='border block p-1 rounded bg-gray-100'>
            {`curl --location --request POST 'https://api.a11ywatch.com/api/scan-simple' \
--header 'Authorization: $A11YWATCH_TOKEN' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'websiteUrl=https://www.jeffmendez.com'`}
          </code>
          <h4 className='text-xl py-1'>Multi page website scan.</h4>
          <h5 className='py-1'>
            Endpoint: https://api.a11ywatch.com/api/crawl
          </h5>
          <code className='border block p-2 rounded bg-gray-100'>
            {`curl --location --request POST 'https://api.a11ywatch.com/api/crawl' \
--header 'Authorization: $A11YWATCH_TOKEN' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'websiteUrl=https://www.jeffmendez.com'`}
          </code>
        </Box>

        <div className='border rounded inline-block px-4 py-1'>
          <p className='text-grey-600 text-lg'>
            This document is going to be refactored soon as we restructure and
            expose more of the main API.
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
    description: `Use A11yWatch's API to get the accessibility uptime you need when you want. Rates are limited based on your membership plan.`,
    gql: true,
  }
)
