import {
  createContext,
  useContext,
  FC,
  useState,
  useEffect,
  PropsWithChildren,
  useCallback,
} from 'react'
import { REST_API } from '@app/configs/app-config'
import { UserManager } from '@app/managers'

const AppContext = createContext({
  activeSubscription: false,
  authed: false,
  // native ads
  ads: [],
  adIndex: -1,
  setRandomIndex: () => {
    return
  },
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
  const [ads, setAds] = useState([])
  const [adIndex, setIndex] = useState(-1)

  const setRandomIndex = useCallback(
    (val?: any[]) => {
      const value = val ?? ads
      setIndex(Math.floor(Math.random() * value.length - 1) + 1)
    },
    [setIndex, ads]
  )

  useEffect(() => {
    if (load) {
      const freeAccount = UserManager.freeAccount

      setAccountType({
        activeSubscription: !freeAccount,
        authed: !!UserManager.token,
      })

      if (freeAccount) {
        fetch(REST_API + '/ads/refs', {
          headers: { authorization: UserManager.token },
        }).then((data) => {
          if (data) {
            data.json().then((json) => {
              if (json && json.length) {
                setAds(json)
              }
            })
          }
        })
      }
    }
  }, [load, setAds])

  return (
    <AuthProvider
      value={{
        ...account,
        ads,
        adIndex,
        setRandomIndex: setRandomIndex as any,
      }}
    >
      {children}
    </AuthProvider>
  )
}

export function useAuthContext() {
  return useContext(AppContext)
}
