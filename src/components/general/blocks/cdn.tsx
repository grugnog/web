import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ScriptDownloadButton } from '@app/components/general'
import { PrismLight } from 'react-syntax-highlighter'
import { a11yDark } from '@app/styles'

const useStyles = makeStyles((theme) => ({
  code: {
    maxHeight: '60vh',
    '&::-webkit-scrollbar': {
      width: 8,
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: 0,
      border: 0,
    },
  },
  codeContainer: {
    maxHeight: '50vh',
  },
  flex: {
    flex: 1,
  },
  listItem: {
    paddingLeft: 6,
    overflow: 'auto',
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    marginBottom: 5,
  },
  minified: {
    fontSize: '0.60rem',
    letterSpacing: 1.2,
    fontWeight: 800,
    background: theme.palette.divider,
    paddingLeft: 12,
    paddingTop: 3,
    paddingBottom: 2,
  },
  space: {
    overflow: 'hidden',
    marginRight: theme.spacing(2),
  },
  adjust: {
    marginBottom: 0,
  },
  bottomCdn: {
    marginTop: 0,
  },
}))

export function CdnBlockComponent({
  cdn_url,
  cdn_url_min,
  hideUrl,
  hideMin,
}: any) {
  const classes = useStyles()

  return (
    <div className={`flex-1 ${classes.row}`}>
      <div className={`flex-1 ${classes.space}`}>
        {!hideUrl && cdn_url ? (
          <>
            {hideMin ? (
              <Typography className={classes.minified}>SOURCE</Typography>
            ) : null}
            <PrismLight
              language='html'
              style={a11yDark}
              className={`${classes.codeContainer} ${classes.adjust}`}
            >
              {`<script src="${cdn_url}"></script>`}
            </PrismLight>
          </>
        ) : null}
        {!hideMin && cdn_url_min ? (
          <>
            <Typography className={classes.minified}>MINIFIED</Typography>
            <PrismLight
              language='html'
              style={a11yDark}
              className={`${classes.codeContainer} ${classes.bottomCdn}`}
            >
              {`<script src="${cdn_url_min}" crossorigin="anonymous"></script>`}
            </PrismLight>
          </>
        ) : null}
      </div>
      <ScriptDownloadButton cdn_url={cdn_url} cdn_url_min={cdn_url_min} />
    </div>
  )
}

export const CdnBlock = memo(CdnBlockComponent)
