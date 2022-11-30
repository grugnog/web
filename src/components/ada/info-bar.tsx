import React, { memo } from 'react'
import { printElement } from '@app/utils'
import { getAPIRoute } from '@app/configs'
import type { Website } from '@app/types'
import { FilterDropdown } from '../feed/filters'
import { Link } from '@app/app/typo/link'

interface InfoBarComponent {
  printable?: boolean
  website: Website
  download?: boolean // display the download button
  onToggleViewModeEvent?: (a?: any) => void
}

const btnStyles =
  'border px-3 py-1.5 font-medium text-gray-700 rounded no-underline hover:border-blue-700 hover:bg-gray-50'

const apiRoute = getAPIRoute()

export function InfoBarComponent({
  printable,
  website,
  download = false,
  onToggleViewModeEvent,
}: InfoBarComponent) {
  if (!printable) {
    return null
  }

  if (!website?.domain) {
    return <div className='flex py-2 space-x-2'></div>
  }

  const onPrint = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    printElement('', website)
  }

  return (
    <div className='flex py-2 space-x-2 border border-l-0 border-r-0'>
      <button className={btnStyles} onClick={onPrint}>
        Print
      </button>
      {download ? (
        <Link
          className={btnStyles}
          href={`${apiRoute}/get-website?q=${website?.url}&download=true`}
        >
          Download
        </Link>
      ) : null}
      {onToggleViewModeEvent ? (
        <button className={btnStyles} onClick={onToggleViewModeEvent}>
          Swap Views
        </button>
      ) : null}
      <FilterDropdown open right />
    </div>
  )
}

export const InfoBar = memo(InfoBarComponent)
