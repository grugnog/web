import { computed, observable, action } from 'mobx'
import { create, persist } from 'mobx-persist'
import { isSameDay } from 'date-fns'
import { userModel } from '@app/data'
import { parseJwt } from '@app/lib/auth'
import { SUPER_MODE } from '@app/configs'

const USER_DEFAULTS = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  jwt: undefined,
}

interface User {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  jwt?: string
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
    userModel.logIn(user)
  }

  // get the authenication token.
  @computed get token() {
    return (
      (typeof userModel !== 'undefined' && userModel?.jwt) ||
      this?.user?.jwt ||
      ''
    )
  }

  @computed get jwtParsed() {
    return parseJwt(this.token) || userModel?.parsedToken
  }

  @computed get freeAccount() {
    return SUPER_MODE === 'true' ? false : this.jwtParsed?.audience === 0
  }

  @computed get firstDay() {
    return isSameDay(this.jwtParsed.iat, Date.now())
  }

  @action clearUser = () => {
    this.user = USER_DEFAULTS
    userModel.logOut()
  }

  @action setJwt = (jwt: string) => {
    if (this.user) {
      this.user.jwt = jwt
    }
    userModel.setJwt(jwt)
  }
}

const manager = new UserManager()

export { manager as UserManager }
