import { computed, observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'
import { isSameDay } from 'date-fns'
import { parseJwt } from '@app/lib/auth'
import { SUPER_MODE } from '@app/configs'

const USER_DEFAULTS = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  jwt: undefined,
  alertsEnabled: undefined,
}

interface User {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  jwt?: string
  alertsEnabled?: boolean
}

class UserManager {
  @persist('object')
  @observable
  user: User

  constructor() {
    this.user = USER_DEFAULTS
    this.hydrate()
  }

  @action
  hydrate = async () => {
    if (typeof window === 'undefined') {
      return
    }

    const pour = create({
      storage: window?.localStorage,
      jsonify: true,
    })

    try {
      await pour('user', this)
    } catch (e) {
      console.error(e)
    }
  }

  @action setUser = (user: User) => {
    this.user = user
  }

  // get the authenication token.
  @computed get token() {
    return this?.user?.jwt || ''
  }

  @computed get jwtParsed() {
    return parseJwt(this.token)
  }

  @computed get freeAccount() {
    return SUPER_MODE === 'true' ? false : this.jwtParsed?.audience === 0
  }

  @computed get firstDay() {
    return isSameDay(this.jwtParsed.iat, Date.now())
  }

  @action clearUser = () => {
    this.user = USER_DEFAULTS
  }

  @action setJwt = (jwt: string) => {
    if (this.user) {
      this.user.jwt = jwt
    }
  }

  @action setAlertsEnabled = (enabled: boolean) => {
    if (this.user) {
      this.user.alertsEnabled = enabled
    }
  }
}

const manager = new UserManager()

export { manager as UserManager }
