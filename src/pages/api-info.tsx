/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, useState, useCallback } from 'react'
import { Container, Typography, Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CopyIcon from '@material-ui/icons/FileCopy'
import { API_ENDPOINT } from '@app/configs'
import { NavBar, PageTitle } from '@app/components/general'
import { Box } from '@a11ywatch/ui'
import { TextSkeleton } from '@app/components/placeholders'
import { AppManager, UserManager } from '@app/managers'
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

function Api({ name }: PageProps) {
  const classes = useStyles()
  const { data = {}, loading } = userData()
  const [keyVisible, setKey] = useState<boolean>(false)
  const { user } = data

  const copyText = useCallback(
    (mav: boolean) => (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
      e?.preventDefault()
      const textString = `${API_ENDPOINT}/${
        !mav ? `website-check` : 'getImage'
      }`
      navigator.clipboard.writeText(textString)
      AppManager.toggleSnack(true, `Copied: ${textString}`, 'success')
    },
    []
  )

  const toggleKey = useCallback(() => {
    setKey(!keyVisible)
  }, [keyVisible])

  const CopyRow = ({ copy = false, text = '' }: any) => {
    return (
      <div className={classes.row}>
        <IconButton style={{ marginRight: 12 }} onClick={copyText(copy)}>
          <CopyIcon />
        </IconButton>
        <Typography variant='subtitle1' component='p'>
          {text}
        </Typography>
      </div>
    )
  }

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
            >
              Documentation
            </a>
          </SectionTitle>
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
          <SectionTitle variant='h4' component={'h2'} bold>
            Endpoints
          </SectionTitle>
          {!data?.user && loading ? (
            <TextSkeleton className={classes.email} />
          ) : (
            <div>
              <Box>
                <SectionTitle variant={'h6'} component={'h3'}>
                  Page Issues : GET/POST
                </SectionTitle>
                <SectionTitle
                  bold
                >{`Params|Body: { url: String }`}</SectionTitle>
                <CopyRow text={`${API_ENDPOINT}/website-check`} />
              </Box>
              <Box>
                <SectionTitle variant={'h6'} component={'h3'}>
                  Image Name : POST
                </SectionTitle>
                <SectionTitle bold>
                  {'Body: { imageBase64: Base64 }'}
                </SectionTitle>
                <CopyRow text={`${API_ENDPOINT}/getImage`} copy={true} />
              </Box>
            </div>
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
