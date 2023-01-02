import React from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react-lite'
import {
  alignCenter,
  tipType,
  row,
  mainButton,
} from '@app/stylesheets/main.module.css'
import { ReccomendedFixes } from './reccomended-fixes'
import { generateFixColors } from './utils'

const TooltipContainer = observer(
  ({
    visible,
    source,
    portalID,
    elementParent,
    contrastRatio,
    store,
    message,
  }: any) => {
    const {
      // elementColor,
      // primaryColor,
      // primaryColorLight,
      // primaryColorDark,
      primaryColorContrast,
      // headerStyle,
    } = generateFixColors({ textFix: store.textFix, source, elementParent })

    return (
      <>
        <ReccomendedFixes
          source={!store.textFix ? elementParent : source}
          primaryColorContrast={primaryColorContrast}
          portalID={portalID}
          elementParent={elementParent}
          textFix={store.textFix}
          contrastRatio={contrastRatio}
          visible={visible}
          message={message}
        />
        <span className={`${row} ${alignCenter}`}>
          <button
            onClick={() => {
              store?.toggle()
            }}
            type={'button'}
            style={{
              width: '100%',
              padding: '1rem 1rem',
              background: 'inherit',
              border: 0,
            }}
            className={`${mainButton} ${tipType}`}
          >
            {!store.textFix ? 'Background' : 'Text'}
          </button>
        </span>
      </>
    )
  }
)

const ToolTip = ({
  visible,
  source,
  portalID,
  elementParent,
  contrastRatio,
  message,
}: any) => {
  // convert to useState instead
  const store = observable({
    textFix: contrastRatio >= 3,
    toggle: action(() => {
      store.textFix = !store.textFix
    }),
  })
  return (
    <TooltipContainer
      visible={visible}
      store={store}
      source={source}
      portalID={portalID}
      elementParent={elementParent}
      contrastRatio={contrastRatio}
      message={message}
    />
  )
}

export { ToolTip }
