import React, { memo, useState } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Spacer, Timer, TestViewRest } from '@app/components/general'
import { CtaCdn } from '@app/components/cta'
import { strings } from '@app-strings'
import { InfoBar } from './info-bar'
import { WebsiteSecondary } from '../general/cells/render/website-secondary'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    width: '38vw',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
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
    maxWidth: '85vw',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingRight: 6,
    paddingLeft: 6,
  },
}))

export function ReportViewComponentLeft({
  website,
  closeButton,
  disablePlayground,
  printable,
  download,
  authenticated,
}: any) {
  const [hideMobile, setMobileHidden] = useState<boolean>(false)
  const classes = useStyles()
  const empty = Object.keys(website ?? {}).length <= 1

  return (
    <div className={classes.container}>
      <Grid className={classes.row}>
        {closeButton}
        <Typography variant='h5' component='p' className={classes.title}>
          {website?.url || strings.trySearch}
        </Typography>
      </Grid>
      <div className='flex space-x-2 place-items-center'>
        <Timer stop={!empty} duration={website?.crawlDuration} />
        <div className='max-w-[85%]'>
          <WebsiteSecondary {...website} pageIssueCount={1} />
        </div>
      </div>
      <CtaCdn
        website={website}
        block
        disablePlayground={disablePlayground}
        authenticated={authenticated}
      />
      <Spacer />
      <InfoBar
        website={website}
        printable={printable}
        download={authenticated && download}
      />
      {website?.url ? (
        <div className='hidden lg:block'>
          <div className='py-2 flex space-x-2 place-items-center border-b'>
            <Typography variant={'body2'}>Live Website</Typography>
            <button
              onClick={() => setMobileHidden((h) => !h)}
              className={'border rounded p-1 px-2'}
            >
              Toggle Viewer
            </button>
          </div>
          <div
            className={!hideMobile ? 'block' : 'hidden'}
            aria-hidden={hideMobile}
          >
            <TestViewRest
              url={website.url || ''}
              marketing
              posRelative
              issues={website?.issue}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export const ReportViewLeft = memo(ReportViewComponentLeft)
