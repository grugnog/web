/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, memo, FC } from 'react'
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
import { Switch } from '@headlessui/react'
import SyntaxHighlighter from 'react-syntax-highlighter'
// import { WebsiteIssuesCell, WebsitePrimaryCell } from '.'
// import { issueSort } from '@app/lib'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

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

const InfoBlock: FC<{ title: string; titleButton?: React.ReactElement }> = ({
  children,
  title,
  titleButton,
}) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.row}>
        <Text
          style={[
            styles.text,
            tailwind(`font-bold ${titleButton ? 'mr-3' : ''}`),
          ]}
        >
          {title}
        </Text>
        {titleButton}
      </View>
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

export function WebsiteCellDashboardComponent({
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
  const [isCdnMinified, setMinified] = useState<boolean>(true)

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
  const cdnUrlMinifed = `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrlMinified}`

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

        <InfoBlock title={'Page Load Time'}>
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

        <InfoBlock
          title={'CDN'}
          titleButton={
            <Switch.Group as='div' className='flex'>
              <Switch
                checked={isCdnMinified}
                onChange={() => setMinified((minified: boolean) => !minified)}
                className={classNames(
                  isCdnMinified ? 'bg-indigo-600' : 'bg-gray-200',
                  'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                )}
              >
                <span
                  aria-hidden='true'
                  className={classNames(
                    isCdnMinified ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                  )}
                />
              </Switch>
              <Switch.Label as='span' className='ml-3'>
                <span className='text-sm font-medium'>MINIFIED</span>
              </Switch.Label>
            </Switch.Group>
          }
        >
          <SyntaxHighlighter
            language='html'
            style={{
              ...a11yDark,
              hljs: {
                ...a11yDark.hljs,
                background: '',
                padding: 0,
                overflow: 'hidden',
                maxWidth: '74vw',
              },
            }}
          >
            {script?.cdnUrl
              ? `<script src="${
                  isCdnMinified ? cdnUrlMinifed : cdnUrl
                }"></script>`
              : 'N/A'}
          </SyntaxHighlighter>
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
          href={`/website-details?websiteUrl=${encodeURIComponent(url)}`}
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

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)
