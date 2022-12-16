import {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { UserManager } from '@app/managers'

const defaultAccount = {
  activeSubscription: false,
  authed: false,
  alertEnabled: false,
  inited: false,
}

const AppContext = createContext({
  account: defaultAccount,
  setAccountType: (_x: typeof defaultAccount) => {},
})

export const AuthProvider = AppContext.Provider

// Determine the initial account type via load client-side
export const AuthProviderWrapper: FC<PropsWithChildren<{ load?: boolean }>> = ({
  children,
  load,
}) => {
  const [account, setAccountType] = useState<{
    activeSubscription: boolean
    authed: boolean
    alertEnabled: boolean
    inited: boolean
  }>({
    activeSubscription: false,
    authed: false,
    alertEnabled: false,
    inited: false,
  })

  useEffect(() => {
    if (load) {
      const freeAccount = UserManager.freeAccount

      setAccountType({
        activeSubscription: !freeAccount,
        authed: !!UserManager.token,
        alertEnabled: !!UserManager?.user?.alertsEnabled,
        inited: true,
      })
    }
  }, [load])

  return (
    <AuthProvider value={{ account, setAccountType }}>{children}</AuthProvider>
  )
}

export function useAuthContext() {
  return useContext(AppContext)
}
