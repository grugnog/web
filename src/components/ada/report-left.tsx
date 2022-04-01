import React, { memo } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { a11yDark } from '@app/styles'
import { RenderSecondary, Spacer, Timer } from '@app/components/general'
import { CtaCdn } from '@app/components/cta'
import { strings } from '@app-strings'
import { EditableMixture } from '@app/components/mixtures/editable-mixture'
import { InfoBar } from './info-bar'

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
    maxWidth: '95vw',
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
}: any) {
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
      <RenderSecondary {...website} />
      <CtaCdn website={website} block disablePlayground={disablePlayground} />
      <Spacer height={8} />
      <Timer stop={!empty} />
      <Spacer height={8} />
      <InfoBar website={website} printable={printable} />
      {website?.script?.script ? (
        <div className='hidden md:block'>
          <div className='py-2'>
            <Typography variant={'body2'}>JS Fixes</Typography>
          </div>
          <div>
            <EditableMixture language='html' style={a11yDark} editMode>
              {website?.script?.script || ''}
            </EditableMixture>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export const ReportViewLeft = memo(ReportViewComponentLeft)
