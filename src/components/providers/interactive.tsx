'use client'

import {
  createContext,
  useContext,
  FC,
  Fragment,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react'
import {
  useDynamicModal,
  defaultProps,
  ModalDataProps,
} from '@app/data/local/useDynamicModal'
import { useMiniPlayer } from '@app/data'
import { HomeManager } from '@app/managers'

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
  selectedWebsite: '', // view mode for main display
  setSelectedWebsite: (_name: string) => {},
})

export const InteractiveProviderWrapper = AppContext.Provider

export const InteractiveProviderMain: BaseProps = ({ children }) => {
  const [selectedWebsite, setSelectedWebsite] = useState<string>('')
  const { modelData, setModal } = useDynamicModal()
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  useEffect(() => {
    setSelectedWebsite(HomeManager.selectedWebsite)
  }, [])

  return (
    <InteractiveProviderWrapper
      value={{
        modelData,
        setModal,
        miniPlayer,
        setMiniPlayerContent,
        selectedWebsite,
        setSelectedWebsite,
      }}
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
