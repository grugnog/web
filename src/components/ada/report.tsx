/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { Fragment } from 'react'
import { Grid, Typography, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { a11yDark } from '@app/styles'
import {
  IssueList,
  RenderSecondary,
  Spacer,
  WebsiteTabs,
  Screenshot,
  TestView,
  Timer,
} from '@app/components/general'
import { ListSkeleton } from '@app/components/placeholders'
import { CtaCdn } from '@app/components/cta'
import { strings } from '@app-strings'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    width: '38vw',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  root: {
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 48,
    ['& > li > *']: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    maxWidth: 160,
    ['& > li > *']: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      flex: 1,
    },
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 6,
  },
  title: {
    flex: 1,
    fontWeight: 600,
    maxWidth: '95vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: 6,
    paddingLeft: 6,
  },
  block: {
    flex: 1,
    display: 'block',
    height: '100%',
  },
  center: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}))

export function ReportView({ website, closeButton, disablePlayground }: any) {
  const classes = useStyles()
  const desktop = useMediaQuery('(min-width:600px)')
  const empty = Object.keys(website).length <= 1

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid className={classes.row}>
          {closeButton}
          <Typography variant='h5' component='p' className={classes.title}>
            {website?.url || strings.trySearch}
          </Typography>
        </Grid>
        <RenderSecondary {...website} />
        <CtaCdn website={website} block disablePlayground={disablePlayground} />
        <Spacer height={8} />
        {disablePlayground ? null : <Timer stop={!empty} />}
        {website?.script?.script && desktop ? (
          <Fragment>
            <Typography gutterBottom variant={'body2'}>
              JS Fixes
            </Typography>
            <Spacer height={2} />
            <div>
              <EditableMixture language='html' style={a11yDark} editMode>
                {website?.script?.script || ''}
              </EditableMixture>
            </div>
          </Fragment>
        ) : null}
      </div>
      {empty ? (
        <div style={{ width: '100%' }}>
          <div className={classes.loading} role='presentation'>
            <ListSkeleton avatar={false} subTitle={false} count={4} />
          </div>
          <div className={classes.toolbar} role='presentation'>
            <ListSkeleton avatar={false} subTitle={false} count={2} />
          </div>
          <ListSkeleton count={8} avatar={false} report />
        </div>
      ) : (
        <WebsiteTabs
          issues={<IssueList website={website} printable />}
          html={
            <EditableMixture
              language='html'
              style={a11yDark}
              lineProps={() => ({
                style: { display: 'block', cursor: 'pointer' },
              })}
              editMode
            >
              {website?.html || ''}
            </EditableMixture>
          }
          screenshot={
            <div className={classes.center}>
              <Screenshot
                url={website?.url}
                src={website?.screenshotStill ?? website.screenshot}
                height={500}
              />
            </div>
          }
          playground={
            disablePlayground ? null : <TestView url={website?.url} marketing />
          }
        />
      )}
    </div>
  )
}
