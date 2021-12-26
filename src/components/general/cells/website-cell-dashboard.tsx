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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from '../link'
import { WebsiteSecondary, MoreOptions } from './render'
import { ModalType } from '@app/data/enums'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@app-theme'
import tailwind from 'tailwind-rn'
import { SCRIPTS_CDN_URL_HOST, AppConfig } from '@app/configs'
import { a11yDark } from '@app/styles'
import { Switch } from '@headlessui/react'
import { PrismLight } from 'react-syntax-highlighter'
import { copyClipboard } from '@app/lib'

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
  domain,
}: any) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const [isCdnMinified, setMinified] = useState<boolean>(true)
  const [isMarkdown, setMarkdown] = useState<boolean>(true)

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

  const prismStyles = {
    ...a11yDark,
    hljs: {
      ...a11yDark.hljs,
      background: '',
      padding: 0,
      overflow: 'hidden',
      maxWidth: '74vw',
    },
  }

  const statusBadgeUrl = `${AppConfig?.graphQLUrl?.replace(
    '/graphql',
    '/status'
  )}/${domain}`

  const reportsLink = `${AppConfig?.graphQLUrl
    ?.replace('api.', '')
    ?.replace('8080', '3000')
    ?.replace('/graphql', '')}/reports/${domain}`

  return (
    <div
      className={`w-full relative border p-4 pl-6 pr-6 rounded overflow-hidden`}
    >
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

      <View style={[styles.row, tailwind('flex-wrap py-1')]}>
        <InfoBlock title={'Accessibility Score'}>
          <Text style={styles.text}>
            {typeof adaScore !== 'undefined' ? `${adaScore}%` : 'N/A'}
          </Text>
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

        <InfoBlock title={'CDN Connected'}>
          <Text style={styles.text}>{cdnConnected ? 'Yes' : 'No'}</Text>
        </InfoBlock>

        <InfoBlock title={'Headers Included'}>
          <Text style={styles.text}>{pageHeaders ? 'Yes' : 'No'}</Text>
        </InfoBlock>
      </View>
      <View style={styles.spacing} />
      <View style={styles.spacing} />

      <View>
        <InfoBlock
          title={'Custom CDN'}
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
          <PrismLight
            language='html'
            style={prismStyles}
            onClick={copyClipboard}
            className={'hover:bg-blue-500 cursor-pointer'}
          >
            {script?.cdnUrl
              ? `<script src="${
                  isCdnMinified ? cdnUrlMinifed : cdnUrl
                }"></script>`
              : 'N/A'}
          </PrismLight>
        </InfoBlock>

        {domain ? (
          <InfoBlock
            title={'Status Badge'}
            titleButton={
              <Switch.Group as='div' className='flex'>
                <Switch
                  checked={isMarkdown}
                  onChange={() => setMarkdown((m: boolean) => !m)}
                  className={classNames(
                    isMarkdown ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                >
                  <span
                    aria-hidden='true'
                    className={classNames(
                      isMarkdown ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                    )}
                  />
                </Switch>
                <Switch.Label as='span' className='ml-3'>
                  <span className='text-sm font-medium'>MARKDOWN</span>
                </Switch.Label>
              </Switch.Group>
            }
          >
            {isMarkdown ? (
              <PrismLight
                language='markdown'
                style={prismStyles}
                onClick={copyClipboard}
                className={'hover:bg-blue-500 cursor-pointer'}
              >
                {`[![A11yWatch](${statusBadgeUrl})](${reportsLink})`}
              </PrismLight>
            ) : (
              <PrismLight
                language='html'
                style={prismStyles}
                onClick={copyClipboard}
                className={'hover:bg-blue-500 cursor-pointer'}
              >
                {`<a href="${reportsLink}"><img src="${statusBadgeUrl}" /></a>`}
              </PrismLight>
            )}
            <div className='py-3'>
              <Link href={reportsLink}>
                <img
                  src={statusBadgeUrl}
                  alt={`Status badge for ${domain}`}
                  width={112}
                  height={20}
                />
              </Link>
            </div>
          </InfoBlock>
        ) : null}
      </View>

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
          pageHeaders={pageHeaders}
          index={index}
        />
      </ListItemSecondaryAction>
    </div>
  )
}

export const WebsiteCellDashboard = memo(WebsiteCellDashboardComponent)
