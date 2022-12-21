import React from 'react'
import { observer } from 'mobx-react-lite'
import { AccessibilityManager } from '@app/managers'
import { GrCopy } from 'react-icons/gr'
import { Header3 } from '../general/header'
import { Button } from '../general'
import { HeadlessModal } from '../modal/headless'

const ScriptFixContainer = observer(({ store }: { store: any }) => {
  const onClick = () => {
    store.toggleScriptFix()
  }

  //TODO: ADD SYNTAX HIGHLIGHTER AND ACTUAL SCRIPT FOR FIX
  const copyText = () => {
    const stringFix = store.scriptFix?.map(({ css }: any) => {
      return css
    })

    const fixString = `<style>
    ${stringFix.join('\n')}
</style>
    `
    navigator.clipboard.writeText(fixString)
  }

  return (
    <HeadlessModal
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      open={store.scriptFixOpen}
      onClose={onClick}
    >
      <div
        className={'max-h-[60vh] px-4 py-4 border-3 overflow-y-auto space-y-3'}
      >
        <div className={'flex place-items-center'}>
          <Header3>CSS FIX</Header3>
          <Button iconButton style={{ left: 20 }} onClick={copyText}>
            <GrCopy />
          </Button>
        </div>
        <code style={{ color: 'rgb(183,83,90' }}>
          {`<style>`}
          <br />
          {store.scriptFix?.map(
            ({ className, getFixStyle, color }: any, i: number) => {
              if (className === '.') {
                return null
              }
              return (
                <code key={i} style={{ marginLeft: 14 }}>
                  <code
                    style={{ color: 'rgb(209,142,96' }}
                  >{`${className}`}</code>
                  <code style={{ color: 'rgb(160,160,160' }}>{` {`}</code>
                  <br />
                  <code
                    style={{ color: 'rgb(157,166,179', marginLeft: 28 }}
                  >{`${getFixStyle}: `}</code>
                  <code style={{ color: 'rgb(209,142,96' }}>{color}</code>
                  <br />
                  <code style={{ marginLeft: 14, color: 'rgb(160,160,160' }}>
                    {`
					}`}
                  </code>
                  <br />
                </code>
              )
            }
          )}
          {`</style>`}
        </code>
      </div>
    </HeadlessModal>
  )
})

const ScriptFix = () => {
  return <ScriptFixContainer store={AccessibilityManager} />
}

export { ScriptFix }
