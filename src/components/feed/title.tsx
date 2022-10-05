import { memo } from 'react'
import { Link } from '../general'

const IssueTitleComponent = ({ pageUrl }: { pageUrl: string }) => (
  <Link
    title={`view in sandbox ${pageUrl}`}
    href={`/website-details?url=${encodeURIComponent(pageUrl)}`}
    className={'text-lg text-gray-700 font-bold'}
  >
    {new URL(pageUrl).pathname}
  </Link>
)

export const IssueTitle = memo(IssueTitleComponent)
