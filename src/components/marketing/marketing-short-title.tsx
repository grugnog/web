import React from 'react'
import { strings } from '@app-strings'

export const MarketingShortTitle = () => {
  return (
    <div
      className={'invisible md:visible py-10 place-items-center flex flex-col'}
    >
      <div className={'font-bold text-2xl'}>{strings.appName}</div>
      <div className={'text-lg'}>{strings.subTitle}</div>
    </div>
  )
}
