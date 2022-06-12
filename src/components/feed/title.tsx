import React, { memo } from 'react'
import { Link } from '../general'

function IssueTitleComponent({
  pageUrl,
  domain,
}: {
  domain: string
  pageUrl: string
}) {
  const tpt = pageUrl && pageUrl.startsWith('https://') ? 'https://' : 'http://'
  const displayPath = pageUrl && pageUrl.replace(`${tpt}${domain}`, '') // trim the url with just the path name. [Faster than using new URL]

  return (
    <div className='flex-1 px-3 py-2 truncate'>
      <Link
        title={`view in sandbox ${pageUrl}`}
        href={`/website-details?url=${encodeURIComponent(pageUrl)}`}
        className={'text-lg'}
        style={{ color: '#707070', fontWeight: 'bold' }}
      >
        {displayPath || '/'}
      </Link>
    </div>
  )
}

export const IssueTitle = memo(IssueTitleComponent)
