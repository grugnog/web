import { Fragment } from 'react'
import { Link } from '@app/components/general/link'
import { Website } from '@app/types'

function CtaCdn({
  website,
  disablePlayground,
  authenticated,
}: {
  website: Website
  disablePlayground: boolean
  authenticated: boolean
}) {
  let limitedResonse = 'Scan Complete'

  if (!website?.issues) {
    limitedResonse = 'Gathering details'
  }

  if (!authenticated) {
    limitedResonse = website?.issuesInfo?.limitedCount
      ? `This is a limited API response showing ${
          website.issuesInfo.limitedCount
        }/${
          website?.issuesInfo?.totalIssues || '_'
        } issues for the current page, sign in to see the full report across all pages.`
      : 'Gathering details'
  } else {
    limitedResonse = `This is a API response showing ${
      website?.issuesInfo?.totalIssues || '_'
    } issues for the current page.`
  }

  return (
    <Fragment>
      {disablePlayground ? (
        <p
          className={'pl-1 pr-2'}
        >
          Get all your pages issues at once and more after signing in
        </p>
      ) : null}
      <div className='py-2'>
        <div className={'border-2 rounded border-gray-500 p-2'}>
          <p className='text-base text-grey-700'>{limitedResonse}</p>
        </div>
      </div>
      {disablePlayground || authenticated ? null : (
        <div className={'flex align-center space-x-2'}>
          <Link
            href={'/login'}
            className={`px-6 py-2 text-lg border rounded font-semibold text-gray-600 border-gray-600`}
          >
            Login
          </Link>
          <Link
            href={'/register'}
            className={`px-6 py-2 text-lg border rounded font-semibold text-blue-600 border-blue-600`}
          >
            Register
          </Link>
        </div>
      )}
    </Fragment>
  )
}

export { CtaCdn }
