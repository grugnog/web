/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import {
  MarketingDrawer,
  SignOnForm,
  NavBarTitle,
} from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Login({ name }: PageProps) {
  return (
    <MarketingDrawer
      title={name}
      maxWidth='sm'
      footerSpacing
      emptyFooter
      emptyNav
    >
      <div
        className={
          'invisible md:visible py-10 place-items-center flex flex-col'
        }
      >
        <NavBarTitle marketing />
        <div>Web Accessibility Improvement</div>
      </div>
      <SignOnForm loginView />
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Login },
  {
    description: 'Login in to get all your accessibility insight and more.',
  }
)
