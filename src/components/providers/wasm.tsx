import { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'

const initial: WASMContext = {}

export const WASMContext = createContext(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children,
}) => {
  const [state, setState] = useState<WASMContext>(initial)

  useEffect(() => {
    ;(async () => {
      const wasm = await import('a11ywatch-web-wasm')
      setState({ wasm })
    })()
  }, [])

  return <WASMContext.Provider value={state}>{children}</WASMContext.Provider>
}

interface WASMContext {
  wasm?: typeof import('a11ywatch-web-wasm')
}

interface WASMContextProviderProps {
  children: ReactNode
}

export function useWasmContext() {
  return useContext(WASMContext)
}
