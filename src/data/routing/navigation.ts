import { useEffect } from 'react'
import { userModel } from '../models'

export const useAuthedRedirect = () => {
  useEffect(() => {
    process.nextTick(() => {
      if (userModel.loggedIn) {
        window.location.href = '/'
      }
    })
  }, [])
}
