/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment } from 'react'
import { List, Button, Typography } from '@material-ui/core'
import { printElement } from '@app/utils'
import { issueSort } from '@app/lib'
import { issueFeedStyles as useStyles } from './styles'
import { RenderIssuesList } from './cells'

const getIssue = (website: any) => {
  let issue
  if (website?.issue) {
    issue = website.issue
  } else if (
    website?.issues?.length &&
    Array.isArray(website?.issues) &&
    website?.issues[0]?.issues
  ) {
    issue = website?.issues[0]?.issues
  } else {
    issue = website?.issues
  }
  return issue
}

export function IssueList({ printable, website, className = '' }: any) {
  const classes = useStyles()
  const CTA_LIST_ID = 'cta-issue-list'
  const issue = getIssue(website) ?? []

  if (!printable) {
    issue.sort(issueSort)
  }

  if (!issue?.length) {
    return (
      <Typography variant='h5' component='p' className={classes.subTitle}>
        {'No issues found. Great work'}
      </Typography>
    )
  }

  return (
    <Fragment>
      {printable ? (
        <Button
          className={classes.print}
          style={{ marginBottom: 14 }}
          onClick={() => printElement(CTA_LIST_ID, website)}
        >
          Print Issues
        </Button>
      ) : null}
      <List
        className={`${classes.searchList} ${className ?? ''}`}
        id={CTA_LIST_ID}
      >
        {issue.map((item: any, listIndex: number) => (
          <RenderIssuesList
            item={item}
            url={issue?.pageUrl}
            listIndex={listIndex}
            error
            key={`${listIndex} ${item?.selector} ${item?.code}`}
          />
        ))}
      </List>
    </Fragment>
  )
}
