import { memo } from 'react'
import { Link } from '../general'

const IssueTitleComponent = ({ pageUrl }: { pageUrl: string }) => {
  const url = new URL(pageUrl)

  const { pathname, search } = url

  return (
    <Link
      title={`view in sandbox ${pageUrl}`}
      href={`/website-details?url=${encodeURIComponent(pageUrl)}`}
      className={'text-lg text-side'}
    >
      {`${pathname}${search}`}
    </Link>
  )
}

export const IssueTitle = memo(IssueTitleComponent)
