import { Fragment } from 'react'
import { Link } from '@app/components/general/link'
import { PageIssue, Website } from '@app/types'

function CtaCdn({
  website,
  disablePlayground,
  authenticated,
}: {
  website: Website & {
    issues: PageIssue[]
  }
  disablePlayground: boolean
  authenticated: boolean
}) {
  let limitedResonse = 'Scan Complete'

  if (!website?.issues) {
    limitedResonse = 'Gathering details'
  }

  const totalCurrentIssues =
    website?.issuesInfo?.totalIssues ?? website?.issues?.length
  const suf = totalCurrentIssues === 1 ? '' : 's'

  if (!authenticated) {
    limitedResonse = website?.issuesInfo
      ? `This is a limited API response showing ${website?.issues?.length}/${
          totalCurrentIssues || '_'
        } issue${suf} for the current page, sign in to see the full report across all pages.`
      : 'Gathering details'
  } else {
    limitedResonse = `This is a API response showing ${
      totalCurrentIssues || '_'
    } issue${suf} for the current page.`
  }

  return (
    <Fragment>
      {disablePlayground ? (
        <p className={'pl-1 pr-2'}>
          Get all your pages issues at once and more after signing in
        </p>
      ) : null}
      <div className='py-2'>
        <div className={'border-2 rounded border-grey-700 p-2'}>
          <p className='text-sm text-grey-700'>{limitedResonse}</p>
        </div>
      </div>
      {disablePlayground || authenticated ? null : (
        <div className={'flex align-center space-x-2'}>
          <Link
            href={'/login'}
            className={`px-6 py-1.5 text-lg border-2 rounded text-grey-700 border-grey-600 hover:no-underline`}
          >
            Login
          </Link>
          <Link
            href={'/register'}
            className={`px-6 py-1.5 text-lg border-none rounded text-grey-700 no-underline hover:bg-grey-50 hover:no-underline`}
          >
            Register
          </Link>
        </div>
      )}
    </Fragment>
  )
}

export { CtaCdn }
