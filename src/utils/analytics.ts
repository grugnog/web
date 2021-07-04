/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import ReactGA from 'react-ga'
import { GOOGLE_ANALYTIC_ID, AppConfig } from '@app/configs'
import { UserManager } from '@app/managers'

let initedGA = false

export const initGA = () => {
  ReactGA.initialize(GOOGLE_ANALYTIC_ID as string)
  initedGA = true
}

// TODO: MOVE TO NEXTJS GA
export const logPageView = (route?: string) => {
  if (!AppConfig.dev) {
    if (!initedGA) {
      initGA()
    }
    const page = String(
      route || (typeof window !== 'undefined' && window.location.pathname)
    )

    ReactGA.set({
      page,
      userId: UserManager.getID,
    })

    ReactGA.pageview(page)
  }
}
