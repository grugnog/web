import { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { Feed } from 'a11ywatch-web-wasm'

type AppWasm = typeof import('a11ywatch-web-wasm')

const initial: WASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<WASMContext>(initial)

  useEffect(() => {
    ;(async () => {
      const wasm = await import('a11ywatch-web-wasm')
      const feed = wasm.Feed.new() // init top level feed

      setState({ wasm, feed })
    })()
  }, [])

  return <WASMContext.Provider value={state}>{children}</WASMContext.Provider>
}

interface WASMContext {
  wasm?: AppWasm
  feed?: Feed
}

interface WASMContextProviderProps {
  children: ReactNode
}

export function useWasmContext() {
  return useContext(WASMContext)
}
