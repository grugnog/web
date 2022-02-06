/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import React, { useState, memo, FC } from 'react'
import { ListItemSecondaryAction, Button } from '@material-ui/core'
import { Link } from '../link'
import { WebsiteSecondary, MoreOptions } from './render'
import { ModalType } from '@app/data/enums'
import { View, Text, StyleSheet } from 'react-native'
import { theme } from '@app-theme'
import tailwind from 'tailwind-rn'
import { SCRIPTS_CDN_URL_HOST, AppConfig } from '@app/configs'
import { a11yDark } from '@app/styles'
import { PrismLight } from 'react-syntax-highlighter'
import { copyClipboard } from '@app/lib'
import { classNames } from '@app/utils'

const styles = StyleSheet.create({
  title: {
    maxWidth: '80vw',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1,
    fontSize: '1.9rem' as any,
    fontWeight: 'bold',
  },
  infoContainer: {
    paddingVertical: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  editor: {
    overflow: 'hidden',
    maxWidth: '70vw',
  },
  text: {
    color: '#000',
    fontSize: 16,
  },
  spacing: {
    marginTop: theme.spacing(2),
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  metaBlock: {
    borderWidth: 1,
    borderColor: theme.palette.divider,
    paddingHorizontal: theme.spacing(2),
    paddingVertical: theme.spacing(1),
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
            tailwind(`text-black font-bold w-28 ${titleButton ? 'mr-3' : ''}`),
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

const prismStyles = {
  ...a11yDark,
  hljs: {
    ...a11yDark.hljs,
    background: '',
    color: '',
    padding: 0,
    overflow: 'hidden',
    maxWidth: '74vw',
  },
}

const BASE_GQL_URL = `${AppConfig?.graphQLUrl
  ?.replace('api.', '')
  ?.replace('8080', '3000')
  ?.replace('/graphql', '')}/reports`

const STATUS_URL = `${AppConfig?.graphQLUrl?.replace('/graphql', '/status')}`

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
  online,
}: any) {
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

  // TODO: REMOVE ALL URL CLIENT APPENDING
  const cdnUrl = `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrl}`
  const cdnUrlMinifed = `${SCRIPTS_CDN_URL_HOST}/${script?.cdnUrlMinified}`
  const statusBadgeUrl = `${STATUS_URL}/${domain}`
  const reportsLink = `${BASE_GQL_URL}/${domain}`

  return (
    <div
      className={`w-full relative border p-4 pl-6 pr-20 rounded overflow-hidden`}
    >
      <div className={'flex w-full'}>
        <div className={'w-full space-y-3'}>
          <div className='flex space-x-2'>
            <Text style={styles.title}>{url}</Text>
          </div>
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
            {adaScore || adaScore === 0 ? `${adaScore}%` : 'N/A'}
          </Text>
        </InfoBlock>

        <InfoBlock title={'Pages'}>
          <Text style={styles.text}>{subDomains?.length}</Text>
        </InfoBlock>

        <InfoBlock title={'Page Load Time'}>
          {pageLoadTime?.durationFormated ? (
            <Text style={styles.text}>
              {pageLoadTime?.durationFormated} at{' '}
              <Text style={{ color: pageLoadTime?.color, fontWeight: 'bold' }}>
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
        <InfoBlock title={'Website Online'}>
          <Text style={styles.text}>{online ? 'Yes' : 'No'}</Text>
        </InfoBlock>
      </View>
      <View style={styles.spacing} />
      <View style={styles.spacing} />

      <View style={styles.metaBlock}>
        <InfoBlock
          title={'Custom CDN'}
          titleButton={
            <div className='flex'>
              <input
                checked={isCdnMinified}
                type='checkbox'
                onChange={() => setMinified((minified: boolean) => !minified)}
                className={classNames(
                  'outline-none relative inline-flex flex-shrink-0 h-5 w-10 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                )}
              ></input>
              <span className='text-sm font-medium ml-3'>MINIFIED</span>
            </div>
          }
        >
          <PrismLight
            language='html'
            style={prismStyles}
            onClick={copyClipboard}
            className={'hover:bg-blue-500 color-black cursor-pointer'}
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
              <div className='flex'>
                <input
                  checked={isMarkdown}
                  type='checkbox'
                  onChange={() => setMarkdown((minified: boolean) => !minified)}
                  className={classNames(
                    'outline-none relative inline-flex flex-shrink-0 h-5 w-10 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  )}
                ></input>
                <span className='text-sm font-medium ml-3'>MARKDOWN</span>
              </div>
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
