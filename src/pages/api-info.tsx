import React, { Fragment, useState, useCallback } from 'react'
import { Container, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { NavBar, PageTitle } from '@app/components/general'
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
  bold: {
    fontWeight: 600,
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

// TODO: GENERATE DOCS FROM API
function Api({ name }: PageProps) {
  const classes = useStyles()
  const { data = {}, loading } = userData()
  const [keyVisible, setKey] = useState<boolean>(false)
  const { user } = data

  const toggleKey = useCallback(() => {
    setKey((c) => !c)
  }, [keyVisible])

  const SectionTitle = ({
    children,
    className,
    variant = 'subtitle2',
    component = 'p',
    bold,
  }: any) => {
    return (
      <Typography
        variant={variant}
        component={component}
        className={`${bold ? classes.bold : ''}${
          className ? ' ' + className : ''
        }`}
      >
        {children}
      </Typography>
    )
  }

  return (
    <Fragment>
      <NavBar
        backButton
        title={name}
        notitle
        marketingLinks={UserManager?.token ? [] : null}
      />
      <Container maxWidth='xl' className={classes.root}>
        <Box>
          <PageTitle title={'API Information'} />
          <SectionTitle variant='subtitle1'>
            Add authorization header with the jwt format <i>Bearer TOKEN</i> for
            more information check{' '}
            <a
              href={'https://docs.a11ywatch.com/documentation/api'}
              target='_blank'
              rel='noreferrer'
            >
              Documentation
            </a>
          </SectionTitle>
          <p>
            This document is going to be refactored soon as we restructure and
            expose more of the main API.
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
          <SectionTitle variant='subtitle1' bold>
            Daily Allowed Usage
          </SectionTitle>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
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
