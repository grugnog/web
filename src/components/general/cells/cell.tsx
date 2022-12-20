import React from 'react'
import type { Website } from '@app/types'

// Cell
export function Cell(props: Website) {
  return (
    <li
      className={'border-b space-y-1 flex w-full px-3 py-2 hover:no-underline'}
    >
      <div className='space-y-2 flex flex-1 flex-col'>
        <div className='text-lg'>{props?.domain}</div>
      </div>
    </li>
  )
}
