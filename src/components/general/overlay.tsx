import React from 'react'
import { overlay } from '@app/stylesheets/overlay.module.css'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import { AppManager } from '@app/managers'

const OverlayContainer = observer(({ store }: any) =>
  store.overlay ? (
    <button
      className={overlay}
      onClick={() => {
        store.toggleOverlay()
      }}
      type='button'
    />
  ) : null
)

export const Overlay = () => <OverlayContainer store={AppManager} />

const OverlayPortals = observer(({ store }: any) => toJS(store.portals))

export const OverlayPortalContainer = () => (
  <OverlayPortals store={AppManager} />
)
