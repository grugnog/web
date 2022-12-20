import { useState } from 'react'

const defultPlayer = {
  open: false,
  title: '',
  data: null,
}

// todo: react-state
export function useMiniPlayer() {
  const [miniPlayer, setMiniPlayer] =
    useState<typeof defultPlayer>(defultPlayer)

  const setMiniPlayerContent = (
    open: boolean = false,
    data: any = '',
    title: string = '',
    toggleModalVisibility?: (a: any) => void
  ) => {
    // if the mini player is open and modals are visible perform close.
    if (toggleModalVisibility && open) {
      toggleModalVisibility((m: any) => ({ ...m, open: false }))
    }

    setMiniPlayer({
      open,
      data: data ?? null,
      title,
    })
  }

  return {
    miniPlayer,
    setMiniPlayerContent,
  }
}
