import { ReactNode, useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import type { Feed } from 'a11ywatch-web-wasm'

const noop = () => {}

const initial: WASMContext = {
  feed: {
    clear_data: noop,
    free: noop,
    get_data: noop,
    insert_website: noop,
    get_website: noop,
    get_data_item: noop,
    get_data_keys: noop,
    sort_website: noop,
    get_page: noop,
    open: false,
  },
}

export const WASMContext = createContext(initial)

export const WASMContextProvider: React.FC<WASMContextProviderProps> = ({
  children,
  load = false,
}) => {
  const [state, setState] = useState<WASMContext>(initial)

  useEffect(() => {
    if (load && state && !state?.wasm) {
      try {
        ;(async () => {
          const wasm = await import('a11ywatch-web-wasm')
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
  wasm?: typeof import('a11ywatch-web-wasm')
  feed: Feed
}

interface WASMContextProviderProps {
  children: ReactNode
  load?: boolean
}

export function useWasmContext() {
  return useContext(WASMContext)
}
