import React from 'react'
import { GrClose } from 'react-icons/gr'
import { Popover } from '@headlessui/react'
import { ToolTip } from './tool-tip'
import { IframeManager } from '@app/managers'
import { Annotations } from './annotations'

type AnnotationContainerProps = {
  contrastRatio?: string
  source: string
  portalID: number
  elementParent: string
  message: string
  code: string
  context: string
  recurrence: string
  errorType: 'warning' | 'error'
}

export function AnnotationContainer({
  contrastRatio,
  source,
  // errorType,
  portalID,
  elementParent,
  message,
  code,
  context,
  recurrence,
  errorType,
}: AnnotationContainerProps) {
  const modalTitle = `${portalID || context + code}-rec-modal-title`
  const modalDescription = `${portalID || context + code}-rec-modal-description`

  return (
    <Popover
      className='relative'
      aria-labelledby={modalTitle}
      aria-describedby={modalDescription}
    >
      {({ open }) => (
        <>
          <Popover.Panel>
            {open ? (
              <div style={{ position: 'absolute', zIndex: 9999 }}>
                <div
                  style={{
                    background: '#fff',
                    color: '#000',
                    border: 0,
                    borderRadius: '0.2rem',
                    maxWidth: '33rem',
                    width: '100%',
                    boxShadow: `inset 0 -1em 1em rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5),
                    0.3em 0.3em 1em rgba(0, 0, 0, 0.3)`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      placeItems: 'center',
                      padding: '0.7rem 0.5rem',
                      textAlign: 'left',
                      borderBottom: '0.5px solid #ccc',
                    }}
                  >
                    <p
                      style={{
                        flex: 1,
                        fontSize: '0.77rem',
                        fontWeight: 500,
                        margin: 0,
                        paddingRight: '0.4rem',
                      }}
                    >
                      {code}
                    </p>
                    <Popover.Button
                      aria-label='close modal'
                      className={'pointer-none px-1 py-2'}
                      style={{
                        background: 'none',
                        border: 0,
                        color: '#ccc',
                        zIndex: 20,
                      }}
                    >
                      <GrClose className='grIcon' />
                    </Popover.Button>
                  </div>
                  <div style={{ padding: '0.25rem 0.5rem', textAlign: 'left' }}>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: 300,
                        margin: 0,
                        padding: '0.4rem 0',
                      }}
                      id={modalTitle}
                    >
                      {context}
                    </p>
                    {recurrence ? (
                      <p
                        style={{
                          fontWeight: 500,
                          fontSize: '0.7rem',
                          margin: 0,
                        }}
                      >
                        Recurred: {recurrence} times
                      </p>
                    ) : null}
                    <p
                      style={{ fontSize: '0.9rem', margin: 0 }}
                      id={modalDescription}
                    >
                      {message}
                    </p>
                  </div>
                  {String(message)?.includes('contrast ratio') ? (
                    <ToolTip
                      visible={IframeManager.activeAnnotation}
                      source={source}
                      portalID={portalID}
                      elementParent={elementParent}
                      contrastRatio={contrastRatio}
                      message={message}
                      code={code}
                      context={context}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}
          </Popover.Panel>
          <Annotations
            contrastRatio={contrastRatio}
            errorType={errorType as 'warning' | 'error'}
            open
          />
        </>
      )}
    </Popover>
  )
}
