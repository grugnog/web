import React from 'react'
import { companyName } from '@app/configs'

function FixedCopyRight() {
  return (
    <div
      className={'text-xs'}
    >{`© ${new Date().getFullYear()} ${companyName}, LLC`}</div>
  )
}

export { FixedCopyRight }
