import { Issue } from '@app/types'
import React, { useState, memo } from 'react'
import { FeedIssue } from '../../../feed/issue'
import { ListCellHeader } from './cell-header'

// return issues maped
const IssuesWrapper = ({
  issues,
  pageUrl,
  open,
}: Issue & { open?: boolean }) => {
  const [visible, setVisible] = useState<boolean>(!!open)

  return (
    <div>
      <ListCellHeader
        title={pageUrl}
        totalIssues={issues?.length || 0}
        setVisible={setVisible}
        visible={visible}
      />
      <ul
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b`}
      >
        {issues?.map((props: any, index: number) => (
          <FeedIssue
            {...props}
            selector={props.selector}
            code={props.code}
            key={props.code + props.selector + index}
          />
        ))}
      </ul>
    </div>
  )
}

// memo expensive issues
export const Issues = memo(IssuesWrapper)
