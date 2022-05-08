import React, { memo } from 'react'
import { Link } from '../general'

function IssueTitleComponent({ pageUrl }: { pageUrl: string }) {
  return (
    <div className='flex-1 px-3 py-2 truncate'>
      <Link
        title={`view in sandbox ${pageUrl}`}
        href={`/website-details?url=${encodeURI(pageUrl)}`}
        className={'text-lg'}
        style={{ color: '#707070', fontWeight: 'bold' }}
      >
        {pageUrl}
      </Link>
    </div>
  )
}

export const IssueTitle = memo(IssueTitleComponent)
