/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { getCookie, setCookie } from 'with-cookie'
import { parseCookie } from '@app/lib/cookies'
import {
  _AUTHED,
  _ALERTS_ENABLED,
  _JWT,
  _ONBOARDED,
} from '@app/lib/cookies/names'
import { parseJwt } from '@app/lib/auth'
import { shutdownIntercom } from 'intercom-next'

const defaultExp = 365

const userModel = {
  email: '',
  deviceType: '',
  jwt: '',
  alertsEnabled: false,
  initModel: function ({
    deviceType = '',
    cookie = '',
  }: {
    deviceType?: string
    cookie?: any
  }) {
    try {
      if (typeof document !== 'undefined') {
        const jssStyles = document.querySelector('#jss-server-side')

        if (jssStyles?.parentNode) {
          jssStyles.parentNode.removeChild(jssStyles)
        }
      }

      if (deviceType) {
        this.deviceType = deviceType
      }

      if (cookie) {
        const {
          [_AUTHED]: email,
          [_JWT]: jwt,
          [_ALERTS_ENABLED]: alertsEnabled,
        } = parseCookie(cookie)

        this.alertsEnabled = alertsEnabled
        this.email = email
        this.jwt = jwt
      }
    } catch (e) {
      console.error(e)
    }
  },
  logOut: function () {
    try {
      this.jwt = ''
      this.email = ''

      shutdownIntercom()
    } catch (e) {
      console.error(e)
    }
  },
  logIn: function ({ email, jwt }: { email: string; jwt: string }): void {
    this.email = email
    this.jwt = jwt
  },
  toggleAlert: function (alertsEnabled: boolean) {
    setCookie(_ALERTS_ENABLED, alertsEnabled, defaultExp)
    this.alertsEnabled = !!alertsEnabled
  },
  alertEnabled: function ({
    toggleCombiner,
    networkCombiner,
  }: {
    toggleCombiner?: boolean
    networkCombiner?: boolean
  }) {
    return !!(this.alertsEnabled || toggleCombiner || networkCombiner)
  },
  setJwt: function (jwt: any) {
    try {
      this.jwt = jwt
    } catch (e) {
      console.error(e)
    }
  },
  get loggedIn() {
    return !!(getCookie(_AUTHED, '') || this.jwt)
  },
  get isMobile() {
    return this.deviceType === 'mobile'
  },
  get parsedToken() {
    return parseJwt(this.jwt)
  },
}

export { userModel }
