import { useState, useMemo, useCallback, memo } from 'react'
import { Link } from '../link'

import {
  AccessibilityBox,
  LoadTimeBox,
  LighthouseBox,
  OnlineBox,
  IssuesBox,
  WarningsBox,
} from './blocks'
import { Issue } from '@app/types'
import { MoreOptionsBase } from './menu'
import { Lighthouse } from '../lighthouse'

const styles = {
  title: 'text-base md:text-lg truncate',
  spacing: 'py-1',
  row: 'flex flex-1',
  metaBlock: 'px-2 py-1 border',
}

// TODO: add types
export function WebsiteCellPagesComponent({
  url,
  removePress,
  handleClickOpen,
  pages,
  handleClickOpenPlayer,
  issues,
  issuesInfo,
  cdnConnected,
  crawlWebsite,
  pageLoadTime,
  pageHeaders,
  index,
  online,
  insight,
  pageInsights,
  lighthouseVisible,
}: any) {
  const [anchorEl, setAnchorEl] = useState<any>(null)
  const { adaScore } = issuesInfo ?? {}

  const handleMenu = useCallback(
    (event: any) => {
      setAnchorEl(event?.currentTarget)
    },
    [setAnchorEl]
  )

  const handleClose = useCallback(() => {
    setAnchorEl(null)
  }, [setAnchorEl])

  const onRemovePress = useCallback(async () => {
    try {
      await removePress({
        variables: {
          url,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }, [url, removePress])

  const handleMainClick =
    (eventData?: any, title?: string, mini?: boolean, url?: string) => () => {
      // mini player open - small modal with dynamic content
      if (mini) {
        handleClickOpenPlayer(true, eventData, title)()
      } else if (handleClickOpen) {
        handleClickOpen(eventData, title, url)
      }

      setAnchorEl(null)
    }

  const linkUrl = useMemo(
    () => `/website-details?url=${encodeURIComponent(url)}`,
    [url]
  )

  // real time issue tracking [TODO: combine with website analytic data]
  const { errorCount, warningCount } = useMemo(() => {
    let errors = 0
    let warnings = 0
    let notices = 0

    if (issues?.length) {
      issues.forEach((iss: any) => {
        const pageIssues = iss?.issues

        pageIssues?.forEach((page: Issue) => {
          if (page?.type === 'error') {
            errors++
          }
          if (page?.type === 'warning') {
            warnings++
          }
          if (page?.type === 'notice') {
            notices++
          }
        })
      })
    } else {
      errors = issuesInfo?.errorCount
      warnings = issuesInfo?.warningCount
      notices = issuesInfo?.noticesCount
    }

    return {
      errorCount: errors,
      warningCount: warnings,
      noticeCount: notices,
      totalIssues: errors + warnings + notices,
    }
  }, [issues, issuesInfo])

  const lhExists = insight && Object.keys(insight)?.length

  return (
    <li className={`px-3 pt-2`}>
      <div className='flex space-x-2 place-items-center'>
        <div
          className={`${styles.title} ${
            cdnConnected ? 'text-blue-600' : ''
          }flex-1`}
        >
          <Link
            title={`view in sandbox ${url}`}
            href={linkUrl}
            className={styles.title}
          >
            {url}
          </Link>
        </div>
        <div>
          <MoreOptionsBase
            url={url}
            issues={issues}
            crawlWebsite={crawlWebsite}
            handleClose={handleClose}
            handleMenu={handleMenu}
            handleMainClick={handleMainClick}
            anchorEl={anchorEl}
            removePress={onRemovePress}
            pages={pages}
            pageHeaders={pageHeaders}
            index={index}
            pageInsights={pageInsights}
            lh={lhExists ? insight : null}
          />
        </div>
      </div>
      <div className={styles.spacing} />
      <div className='grid grid-cols-1 gap-1 sm:grid-cols-3'>
        <AccessibilityBox adaScore={adaScore} average={false} />
        <IssuesBox issues={errorCount} />
        <WarningsBox issues={warningCount} />
        <LoadTimeBox duration={pageLoadTime?.duration} />
        <LighthouseBox pageInsights={insight || (insight && !!lhExists)} />
        <OnlineBox online={online} />
      </div>
      <div className={styles.spacing} />
      <div
        className={`py-2 ${
          pageInsights && lighthouseVisible ? 'visible' : 'hidden'
        }`}
        aria-expanded={insight && lighthouseVisible}
      >
        {insight ? <Lighthouse insight={insight} /> : null}
      </div>
    </li>
  )
}

export const WebsiteCellPages = memo(WebsiteCellPagesComponent)
