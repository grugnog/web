'use client'

import {
  createContext,
  useContext,
  FC,
  Fragment,
  PropsWithChildren,
} from 'react'
import { useDynamicModal, defaultProps } from '@app/data/local/useDynamicModal'

type BaseProps = FC<PropsWithChildren<{ load?: boolean }>>

const AppContext = createContext({
  modelData: defaultProps, // dynamic modal data
  setModal: (_x: typeof defaultProps) => {},
})

export const InteractiveProviderWrapper = AppContext.Provider

// Determine the initial account type via load client-side
export const InteractiveProviderMain: BaseProps = ({ children }) => {
  const { modelData, setModal } = useDynamicModal()

  return (
    <InteractiveProviderWrapper value={{ modelData, setModal }}>
      {children}
    </InteractiveProviderWrapper>
  )
}

export const InteractiveProvider: BaseProps = ({ children, load }) => {
  if (!load) {
    return <Fragment>{children}</Fragment>
  }
  return <InteractiveProviderMain>{children}</InteractiveProviderMain>
}

export function useInteractiveContext() {
  return useContext(AppContext)
}
