import { setCookie } from 'with-cookie'
import { parseCookie } from '@app/lib/cookies'
import { _ALERTS_ENABLED, _JWT, _ONBOARDED } from '@app/lib/cookies/names'
import { parseJwt } from '@app/lib/auth'
import { User } from '@app/types'

const defaultExp = 365

const userModel = {
  email: '',
  jwt: '',
  alertsEnabled: false,
  initModel: function ({ cookie = '' }: { cookie?: any }) {
    if (typeof document !== 'undefined') {
      const jssStyles = document.querySelector('#jss-server-side')

      if (jssStyles?.parentNode) {
        jssStyles.parentNode.removeChild(jssStyles)
      }
    }

    if (cookie) {
      const { [_JWT]: jwt, [_ALERTS_ENABLED]: alertsEnabled } = parseCookie(
        cookie,
        // rest params for token matching
        _JWT,
        _ALERTS_ENABLED
      )

      this.alertsEnabled = alertsEnabled
      this.jwt = jwt
    }

    return this.jwt
  },
  logOut: function () {
    this.jwt = ''
    this.email = ''
  },
  logIn: function ({ email, jwt }: User) {
    if (email) {
      this.email = email
    }
    if (jwt) {
      this.jwt = jwt
    }
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
  setJwt: function (jwt: string) {
    this.jwt = jwt
  },
  get loggedIn() {
    return !!this.jwt
  },
  get parsedToken() {
    return parseJwt(this.jwt)
  },
}

export { userModel }
