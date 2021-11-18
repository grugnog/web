/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, FC } from 'react'
import {
  ListItemSecondaryAction,
  ListItemText,
  Button,
  // List,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'
import { RenderAvatar, WebsiteSecondary, MoreOptions } from './render'
import { ModalType } from '@app/data/enums'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@app-theme'
import tailwind from 'tailwind-rn'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs'
import { a11yDark } from '@app/styles'
import SyntaxHighlighter from 'react-syntax-highlighter'

// import { WebsiteIssuesCell, WebsitePrimaryCell } from '.'
// import { issueSort } from '@app/lib'

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
  editor: {
    overflow: 'hidden',
    maxWidth: '70vw',
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

const InfoBlock: FC<{ title: string }> = ({ children, title }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.text, tailwind('font-bold')]}>{title}</Text>
      <View style={styles.spacing} />
      {children}
    </View>
  )
}

const CenterContainer: FC = ({ children }) => (
  <div className={'flex flex-col w-full place-items-center py-2 my-2'}>
    {children}
  </div>
)

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
  script,
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

  const cdnUrl = `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrl}`

  return (
    <div className={`w-full border p-4 pl-6 pr-6 rounded overflow-hidden`}>
      <div className={'flex w-full'}>
        <div className={'w-full'}>
          <ListItemText
            primary={url}
            primaryTypographyProps={{
              className: classes.title,
            }}
          />
          <WebsiteSecondary
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
        <InfoBlock title={'Accessibility Score'}>
          <RenderAvatar
            cdnConnected={cdnConnected}
            adaScore={adaScore}
            error={false}
          />
        </InfoBlock>

        <InfoBlock title={'CDN Connected'}>
          <Text style={styles.text}>{cdnConnected ? 'Yes' : 'No'}</Text>
        </InfoBlock>

        <InfoBlock title={'Pages'}>
          <Text style={styles.text}>{subDomains?.length}</Text>
        </InfoBlock>

        <InfoBlock title={'Page Speed'}>
          {pageLoadTime?.durationFormated ? (
            <Text style={styles.text}>
              {pageLoadTime?.durationFormated} at{' '}
              <Text style={{ color: pageLoadTime?.color }}>
                {pageLoadTime?.duration}ms
              </Text>
            </Text>
          ) : (
            <Text style={styles.text}>0ms</Text>
          )}
        </InfoBlock>

        <InfoBlock title={'CDN'}>
          {script?.cdnUrl ? (
            <View style={styles.editor}>
              <SyntaxHighlighter language='html' style={a11yDark}>
                {`<script src="${cdnUrl}"></script>`}
              </SyntaxHighlighter>
            </View>
          ) : (
            <Text style={styles.text}>N/A</Text>
          )}
        </InfoBlock>
      </View>

      {/* <CenterContainer>
        <List className={'invisible lg:visible w-1/2 py-4 border my-4 rounded'}>
          {issues?.length
            ? issues.sort(issueSort)?.map((item: any, listIndex: number) => {
                return (
                  <WebsiteIssuesCell
                    handleClickOpenPlayer={handleClickOpenPlayer}
                    handleClickOpen={handleClickOpen}
                    handleClose={handleClose}
                    key={`${listIndex} ${item?.selector} ${item?.code}`}
                    openError
                    // issuesModal={issuesModal}
                    // noMaxHeight={data?.length === 1}
                    error={false}
                    item={item}
                    url={url}
                  />
                )
              })
            : null}
        </List>
      </CenterContainer> */}

      <CenterContainer>
        <Button
          component={Link}
          href={href}
          color={'inherit'}
          className={'w-40'}
        >
          View Details
        </Button>
      </CenterContainer>

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
