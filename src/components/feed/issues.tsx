/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { memo, FC } from 'react'
import { Typography, IconButton, Fade } from '@material-ui/core'
import { Close as CloseIcon } from '@material-ui/icons'
import { issueSort } from '@app/lib'
import { useStyles } from '../general/styles'
import { WebsitePrimaryCell } from '../general/cells'
import { useWebsiteContext } from '../providers/website'

const Feed: FC = () => {
  const classes = useStyles()
  const { issueFeed, setIssueFeedContent } = useWebsiteContext()

  if (issueFeed?.data?.length && issueFeed?.open) {
    return (
      <Fade in>
        <div className={classes.root}>
          <div className={`${classes.row} ${classes.titleContainer}`}>
            <Typography variant='h6' component='p' className={classes.title}>
              Recent Issues
            </Typography>
            <IconButton
              edge='start'
              color='inherit'
              onClick={() => setIssueFeedContent([], false)}
              aria-label='close'
            >
              <CloseIcon />
            </IconButton>
          </div>
          {issueFeed?.data?.map((issue: any, issueIndex: number) => {
            const issues = issue?.issues?.sort(issueSort)

            return (
              <div key={`${issueIndex} ${issue?.pageUrl} ${issue?.domain}`}>
                <Typography
                  variant='subtitle1'
                  component='p'
                  className={classes.subTitle}
                >
                  {issue.pageUrl}
                </Typography>
                <div className={classes.list}>
                  {issues.map((item: any, listIndex: number) => {
                    return (
                      <div key={`${item?.selector} ${item?.code} ${listIndex}`}>
                        <WebsitePrimaryCell
                          issuesModal
                          error
                          item={item}
                          listIndex={listIndex}
                          url={issue?.pageUrl}
                          listTitleMax
                        />
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </Fade>
    )
  }
  return null
}

export const IssueFeed = memo(Feed)
