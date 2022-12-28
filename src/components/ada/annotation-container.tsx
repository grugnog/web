import React from 'react'
import { GrClose } from 'react-icons/gr'
import { HeadlessModal } from '../modal/headless'
import { ToolTip } from './tool-tip'

const textBaseStyle = 'flex-1'

export function AnnotationContainer({
  store,
  contrastRatio,
  source,
  // errorType,
  portalID,
  elementParent,
  message,
  code,
  context,
  recurrence,
}: any) {
  const onClose = (event: any) => {
    store.setActiveAnnotation(null)
    if (event) {
      event?.preventDefault()
      event?.stopPropagation()
    }
  }

  const modalTitle = `${portalID || context + code}-rec-modal-title`
  const modalDescription = `${portalID || context + code}-rec-modal-description`

  // todo: move multi headless injections outside
  return (
    <HeadlessModal
      onClose={onClose}
      open={store?.activeAnnotation}
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
      hideBackdrop
      center
    >
      <div className={'w-full bg-white border-4 shadow-xl'}>
        <div className={`flex place-items-center border-b py-2 px-3`}>
          <h3 className={`flex-1 text-lg`}>Recommended</h3>
          <button
            aria-label='close modal'
            onClick={onClose}
            className={'pointer-none px-1 py-2'}
          >
            <GrClose />
          </button>
        </div>
        <div className='px-3 py-2 space-y-2'>
          <p className={`${textBaseStyle} text-sm truncate font-light`}>
            {code}
          </p>
          <p
            id={modalTitle}
            className={`${textBaseStyle}  text-sm font-medium`}
          >
            {context}
          </p>
          {recurrence ? (
            <p className={'truncate text-sm font-bold'}>
              Recurred: {recurrence} times
            </p>
          ) : null}
          <p
            className={`${textBaseStyle} text-sm text-gray-600`}
            id={modalDescription}
          >
            {message}
          </p>
        </div>
        {String(message)?.includes('contrast ratio') ? (
          <ToolTip
            visible={store.activeAnnotation}
            source={source}
            portalID={portalID}
            elementParent={elementParent}
            contrastRatio={contrastRatio}
            message={message}
            code={code}
            context={context}
            close={onClose}
          />
        ) : null}
      </div>
    </HeadlessModal>
  )
}
