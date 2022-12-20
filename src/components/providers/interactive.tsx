'use client'

import {
  createContext,
  useContext,
  FC,
  Fragment,
  PropsWithChildren,
} from 'react'
import {
  useDynamicModal,
  defaultProps,
  ModalDataProps,
} from '@app/data/local/useDynamicModal'
import { useMiniPlayer } from '@app/data'

type BaseProps = FC<PropsWithChildren<{ load?: boolean }>>

const AppContext = createContext({
  modelData: defaultProps, // dynamic modal data
  miniPlayer: {
    open: false,
    title: '',
    data: null,
  },
  setModal: (_x: ModalDataProps) => {},
  setMiniPlayerContent: (_open?: boolean, _data?: any, _title?: string) => {},
})

export const InteractiveProviderWrapper = AppContext.Provider

// Determine the initial account type via load client-side
export const InteractiveProviderMain: BaseProps = ({ children }) => {
  const { modelData, setModal } = useDynamicModal()
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  return (
    <InteractiveProviderWrapper
      value={{ modelData, setModal, miniPlayer, setMiniPlayerContent }}
    >
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
