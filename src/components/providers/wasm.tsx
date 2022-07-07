import { memo, ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { Feed } from 'a11ywatch-web-wasm'

type AppWasm = typeof import('a11ywatch-web-wasm')

const initial: WASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProviderWrapper: React.FC<WASMContextProviderProps> = ({
  children,
  load = false,
}) => {
  const [state, setState] = useState<WASMContext>(initial)

  useEffect(() => {
    if (load && state && !state?.wasm) {
      ;(async () => {
        const wasm = await import('a11ywatch-web-wasm')
        const feed = wasm.Feed.new() // init top level feed

        setState({ wasm, feed })
      })()
    }
  }, [load, state])

  return <WASMContext.Provider value={state}>{children}</WASMContext.Provider>
}

interface WASMContext {
  wasm?: AppWasm
  feed?: Feed
}

interface WASMContextProviderProps {
  children: ReactNode
  load?: boolean
}

export function useWasmContext() {
  return useContext(WASMContext)
}

export const WASMContextProvider = memo(WASMContextProviderWrapper)
