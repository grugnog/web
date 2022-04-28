import React, { Fragment, useState, useCallback } from 'react'
import { Container, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NavBar, PageTitle, Link } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { UserManager } from '@app/managers'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  token: {
    background: 'transparent',
  },
  apiContainer: {
    overflow: 'hidden',
    height: 'auto',
  },
  passwordTitle: {
    marginRight: theme.spacing(2),
  },
  input: {
    background: 'transparent',
    color: theme.palette.text.primary,
    textDecoration: 'underline',
  },
  smallInput: {
    width: 70,
  },
  jwt: {
    maxWidth: '50vw',
    textAlign: 'left',
  },
}))

const SectionTitle = ({ children, className, bold }: any) => {
  return (
    <h2
      className={`text-2xl ${bold ? 'font-bold' : ''}${
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

  const toggleKey = useCallback(() => {
    setKey((c) => !c)
  }, [])

  return (
    <Fragment>
      <NavBar
        backButton
        title={name.toUpperCase()}
        notitle
        marketingLinks={UserManager?.token ? [] : null}
      />
      <Container maxWidth='xl' className={classes.root}>
        <Box>
          <PageTitle title={'API Details and Usage'} />
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
          ) : UserManager?.token ? (
            <div>
              <Button
                className={classes.payments}
                type='button'
                onClick={toggleKey}
                variant='outlined'
              >
                {`${keyVisible ? 'HIDE' : 'VIEW'} TOKEN`}
              </Button>
              {keyVisible ? (
                <div className={`${classes.container} ${classes.apiContainer}`}>
                  <Typography className={classes.token}>
                    {UserManager?.token}
                  </Typography>
                </div>
              ) : null}
            </div>
          ) : null}
        </Box>

        <Box>
          <SectionTitle variant='subtitle1' bold>
            Daily Allowed Usage
          </SectionTitle>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
          ) : !data?.user ? (
            <p className={'pb-2 text-lg'}>
              <Link href={'/login'}>Login</Link> to see your API limits.
            </p>
          ) : (
            <SectionTitle className={classes.email}>
              {user?.apiUsage?.usage || 0}/
              {!data?.user
                ? 0
                : user?.role === 0
                ? 3
                : user?.role === 1
                ? 25
                : 100}
            </SectionTitle>
          )}
        </Box>

        <Box>
          <h3 className='text-xl font-bold'>API Endpoints</h3>
          <h4 className='text-lg pb-1'>Scan a website for issues.</h4>
          <code className='border block p-2 rounded bg-gray-100'>
            {`curl --location --request POST
            'https://api.a11ywatch.com/api/scan-simple' \ --header
            'Content-Type: application/x-www-form-urlencoded' \ --data-urlencode
            'url=https://www.nytimes.com'`}
          </code>
        </Box>

        <div className='border rounded inline-block px-4 py-1'>
          <p className='text-grey-600 text-lg'>
            This document is going to be refactored soon as we restructure and
            expose more of the main API.
          </p>
        </div>
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
