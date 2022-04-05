import React, { useEffect, useMemo, useState } from 'react'
import {
  Typography,
  ListSubheader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ScriptDownloadButton } from '@app/components/general'
import { PrismLight } from 'react-syntax-highlighter'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs/app-config'
import { a11yDark } from '@app/styles'
import { GrDomain, GrDown, GrUp } from 'react-icons/gr'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.divider,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
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
  title: {
    flex: 1,
    fontWeight: 500,
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
  listInnerContainer: {
    display: 'block',
    paddingTop: 0,
    paddingBottom: 0,
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

const handleClick = (item: any, open: boolean | string, cb?: any) => {
  cb(item === open ? '' : item)
}

export function CollaspeListCdn({ dataSource }: any) {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean | string>(true)
  const entries = useMemo(() => Object.entries(dataSource), [dataSource])

  useEffect(() => {
    if (entries?.length) {
      setOpen(entries[0][0])
    }
  }, [entries, setOpen])

  return (
    <List
      component='nav'
      aria-labelledby='nested-list-subheader'
      subheader={<li />}
      className={classes.root}
    >
      {entries?.map((item: any) => {
        const sectionTitle = item[0]
        const sectionData = item[1]

        return (
          <span key={`${sectionTitle}-wrap`}>
            <ListItem
              button
              onClick={() => handleClick(sectionTitle, open, setOpen)}
            >
              <ListItemIcon>
                <GrDomain />
              </ListItemIcon>
              <ListItemText primary={sectionTitle} />
              {sectionTitle === open ? <GrUp /> : <GrDown />}
            </ListItem>
            <Collapse in={sectionTitle === open} timeout='auto' unmountOnExit>
              <ul>
                {sectionData?.map((source: any, i: number) => {
                  const cdn_url = `${SCRIPTS_CDN_URL_HOST}/${source?.cdnUrl}`
                  const cdn_url_min = `${SCRIPTS_CDN_URL_HOST}/${source?.cdnUrlMinified}`

                  return (
                    <ListItem
                      key={`${source?.pageUrl}-${i}`}
                      className={`${classes.listItem} ${classes.listInnerContainer}`}
                    >
                      <ListSubheader style={{ flex: 1 }} component={'span'}>
                        {source?.pageUrl}
                      </ListSubheader>
                      <div className={`${classes.flex} ${classes.row}`}>
                        <div className={`${classes.flex} ${classes.space}`}>
                          <PrismLight
                            language='html'
                            style={a11yDark}
                            className={`${classes.codeContainer} ${classes.adjust}`}
                          >
                            {`<script src="${cdn_url}"></script>`}
                          </PrismLight>
                          <Typography className={classes.minified}>
                            MINIFIED
                          </Typography>
                          <PrismLight
                            language='html'
                            style={a11yDark}
                            className={`${classes.codeContainer} ${classes.bottomCdn}`}
                          >
                            {`<script src="${cdn_url_min}" crossorigin="anonymous"></script>`}
                          </PrismLight>
                        </div>
                        <ScriptDownloadButton
                          cdn_url={cdn_url}
                          cdn_url_min={cdn_url_min}
                        />
                      </div>
                    </ListItem>
                  )
                })}
              </ul>
            </Collapse>
          </span>
        )
      })}
    </List>
  )
}
