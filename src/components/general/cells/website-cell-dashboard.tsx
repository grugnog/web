/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState } from 'react'
import {
  ListItemSecondaryAction,
  ListItemText,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'
import { RenderAvatar, RenderSecondary, MoreOptions } from './render'
import { ModalType } from '@app/data/enums'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@app-theme'
import tailwind from 'tailwind-rn'

const useStyles = makeStyles(() => ({
  title: {
    maxWidth: '80vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    fontSize: '1.9rem',
    fontWeight: 500,
  },
}))

const styles = StyleSheet.create({
  infoContainer: {
    paddingVertical: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  spacing: {
    marginTop: theme.spacing(2),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
})

export function WebsiteCellDashboard({
  url,
  removePress,
  handleClickOpen,
  subDomains,
  handleClickOpenPlayer,
  issues,
  issuesInfo,
  adaScore,
  cdnConnected,
  crawlWebsite,
  setModal,
  html,
  pageLoadTime,
  mutatationLoading,
  lastScanDate,
  pageHeaders,
  index,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)

  const handleMenu = (event: any) => {
    setAnchorEl(event?.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const removeWebsite = (e: any) => {
    e?.preventDefault()
    removePress(url)
  }

  const href = `/website-details?websiteUrl=${encodeURIComponent(url)}`

  const handleMainClick = (
    eventData?: any,
    title?: string,
    mini?: boolean,
    url?: string
  ) => () => {
    if (mini) {
      handleClickOpenPlayer(true, eventData, title)()
    } else {
      handleClickOpen(eventData, title, url)
    }

    setAnchorEl(null)
  }
  const modalClick = () => {
    setModal({ open: true, modalType: ModalType.highlight, html, url })
    setAnchorEl(null)
  }

  return (
    <div className={`w-full border p-4 rounded overflow-hidden`}>
      <div className={'flex w-full'}>
        <div className={'w-full'}>
          <ListItemText
            primary={url}
            primaryTypographyProps={{
              className: classes.title,
            }}
          />
          <RenderSecondary
            issuesInfo={issuesInfo}
            cdnConnected={cdnConnected}
            adaScore={adaScore}
            issues={issues}
            pageLoadTime={pageLoadTime}
            mutatationLoading={mutatationLoading}
            lastScanDate={lastScanDate}
            pageHeaders={pageHeaders}
          />
        </div>
      </div>
      <View style={styles.spacing} />

      <View style={[styles.row, tailwind('flex-wrap')]}>
        <View style={styles.infoContainer}>
          <Text style={[styles.text, tailwind('font-bold')]}>
            Accessibility Score
          </Text>
          <View style={styles.spacing} />
          <RenderAvatar
            cdnConnected={cdnConnected}
            adaScore={adaScore}
            error={false}
          />
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, tailwind('font-bold')]}>
            CDN Connected
          </Text>
          <View style={styles.spacing} />
          <Text style={styles.text}>{cdnConnected ? 'Yes' : 'No'}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, tailwind('font-bold')]}>Page Speed</Text>
          <View style={styles.spacing} />
          <Text style={styles.text}>
            {pageLoadTime?.durationFormated} at{' '}
            <Text style={{ color: pageLoadTime?.color }}>
              {pageLoadTime?.duration}ms
            </Text>
          </Text>
        </View>
      </View>

      <div className={'flex flex-col w-full place-items-center py-2 my-2'}>
        <Button
          component={Link}
          href={href}
          color={'inherit'}
          className={'w-40'}
        >
          View Details
        </Button>
      </div>

      <ListItemSecondaryAction>
        <MoreOptions
          url={url}
          issues={issues}
          removeWebsite={removeWebsite}
          crawlWebsite={crawlWebsite}
          handleClose={handleClose}
          handleMenu={handleMenu}
          handleMainClick={handleMainClick}
          modalClick={modalClick}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          removePress={removePress}
          subDomains={subDomains}
          html={html}
          index={index}
        />
      </ListItemSecondaryAction>
    </div>
  )
}
