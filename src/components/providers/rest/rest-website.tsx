'use client'

import {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  Fragment,
} from 'react'
import { useSearchRest } from '@app/data'
import { restWebsiteDefaults } from '../defaults'

const AppContext = createContext(restWebsiteDefaults)

export const RestWebsiteProvider = AppContext.Provider

type RestProps = PropsWithChildren<{
  rest?: boolean
}>

export const RestWebsiteProviderWrapperMain: FC<RestProps> = ({ children }) => {
  const sharedState = useSearchRest()

  return (
    <RestWebsiteProvider value={sharedState}>{children}</RestWebsiteProvider>
  )
}

// wrapper
export const RestWebsiteProviderWrapper: FC<RestProps> = ({
  children,
  rest,
}) => {
  if (!rest) {
    return <Fragment>{children}</Fragment>
  }
  return (
    <RestWebsiteProviderWrapperMain>{children}</RestWebsiteProviderWrapperMain>
  )
}

export function useRestWebsiteContext() {
  return useContext(AppContext)
}
