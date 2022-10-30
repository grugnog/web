import { memo, ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { Feed } from 'wasm'

type AppWasm = typeof import('wasm')

const initial: WASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProviderWrapper: React.FC<WASMContextProviderProps> = ({
  children,
  load = false,
}) => {
  const [state, setState] = useState<WASMContext>(initial)

  useEffect(() => {
    if (load && state && !state?.wasm) {
      try {
        ;(async () => {
          const wasm = await import('wasm')
          const feed = wasm.Feed.new() // init top level feed

          setState({ wasm, feed })
        })()
      } catch (e) {
        // TODO: add fallback js bundle if wasm fails to load or bind it to the initial wasm package.
        console.error(e)
      }
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
