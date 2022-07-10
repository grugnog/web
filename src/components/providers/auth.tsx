import { UserManager } from '@app/managers'
import { createContext, useContext, FC, useState, useEffect } from 'react'

const AppContext = createContext({
  activeSubscription: false,
  authed: false,
})

export const AuthProvider = AppContext.Provider

// Determine the initial account type via load
export const AuthProviderWrapper: FC<{ load?: boolean }> = ({
  children,
  load,
}) => {
  const [account, setAccountType] = useState<{
    activeSubscription: boolean
    authed: boolean
  }>({ activeSubscription: false, authed: false })

  useEffect(() => {
    if (load) {
      setAccountType({
        activeSubscription: UserManager.freeAccount,
        authed: !!UserManager.token,
      })
    }
  }, [load])

  return <AuthProvider value={account}>{children}</AuthProvider>
}

export function useAuthContext() {
  return useContext(AppContext)
}
