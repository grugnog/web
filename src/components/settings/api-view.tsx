import React from 'react'
import { Header3 } from '@app/components/general/header'
import { User } from '@app/types'
import { settingsHeadingStyle } from '@app/styles/headings'
import { APIInfoBlock } from '../general/blocks/api-info'
import { Link } from '../stateless/typo/link'

export const ApiView = ({ user }: { user: User }) => {
  return (
    <div className='py-2 gap-y-2 border-t'>
      <div>
        <Header3 className={settingsHeadingStyle}>API Info</Header3>
        <APIInfoBlock user={user} loading={!user} />
        <div className='py-2'>
          <Link href={'/api-info'} className={'text-blue-500 underline'}>
            API Details
          </Link>
        </div>
      </div>
    </div>
  )
}
