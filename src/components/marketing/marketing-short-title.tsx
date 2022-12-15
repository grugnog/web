import React from 'react'
import { strings } from '@app-strings'

export const MarketingShortTitle = ({ hidden }: { hidden?: boolean }) => {
  return (
    <div
      className={`hidden md:block py-10 text-center${hidden ? ' sr-only' : ''}`}
    >
      <div className={'font-bold text-2xl'}>{strings.appName}</div>
      <div className={'text-lg'}>{strings.subTitle}</div>
    </div>
  )
}
