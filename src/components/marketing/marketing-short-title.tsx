import React from 'react'
import { strings } from '@app-strings'

export const MarketingShortTitle = () => {
  return (
    <div className={'hidden md:block py-10 text-center'}>
      <div className={'font-bold text-2xl'}>{strings.appName}</div>
      <div className={'text-lg'}>{strings.subTitle}</div>
    </div>
  )
}
