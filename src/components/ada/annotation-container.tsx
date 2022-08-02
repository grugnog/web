import { Modal } from '@material-ui/core'
import Draggable from 'react-draggable'
import { GrClose } from 'react-icons/gr'

import { ToolTip } from './tool-tip'

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
    event?.preventDefault()
    event?.stopPropagation()
  }

  const textBaseStyle = 'flex-1'

  return (
    <Modal
      disableAutoFocus
      keepMounted
      onClose={onClose}
      open={store?.activeAnnotation}
      aria-labelledby='rec-modal-title'
      aria-describedby='rec-modal-description'
    >
      <Draggable
        handle={'#annotationHeader'}
        cancel={'#annotationCancel'}
        allowAnyClick={false}
      >
        <div
          className={
            'absolute w-[320px] md:w-[400px] bg-white border rounded shadow-lg'
          }
        >
          <div
            id={'annotationHeader'}
            className={`flex place-items-center border-b py-2 px-2`}
          >
            <h3 className={`flex-1 text-lg`}>Recommended</h3>
            <button
              id={'annotationCancel'}
              aria-label='close modal'
              onClick={onClose}
              className={'pointer-none px-1 py-2'}
            >
              <GrClose />
            </button>
          </div>
          <div className='px-2'>
            <p
              id='rec-modal-title'
              className={`${textBaseStyle} font-bold py-2`}
            >
              {context}
            </p>
            <p
              id='rec-modal-description'
              className={`${textBaseStyle} pb-2 text-sm truncate font-light`}
            >
              {code}
            </p>
            {recurrence ? (
              <p className={'truncate text-sm font-bold py-2'}>
                Recurred: {recurrence} times
              </p>
            ) : null}
            <p className={`${textBaseStyle} pb-2`}>{message}</p>
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
      </Draggable>
    </Modal>
  )
}
