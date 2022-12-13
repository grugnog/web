import {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react'
import { UserManager } from '@app/managers'

const AppContext = createContext({
  activeSubscription: false,
  authed: false,
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
  }>({ activeSubscription: false, authed: false })

  useEffect(() => {
    if (load) {
      const freeAccount = UserManager.freeAccount

      setAccountType({
        activeSubscription: !freeAccount,
        authed: !!UserManager.token,
      })
    }
  }, [load])

  return <AuthProvider value={account}>{children}</AuthProvider>
}

export function useAuthContext() {
  return useContext(AppContext)
}
