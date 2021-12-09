/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
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
