import React, { memo } from 'react'
import { TextField, IconButton } from '@material-ui/core'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { InputActionsEvents } from './input-actions-events'

export function InputActionsComponent(props: any) {
  const {
    customActions,
    customFields,
    removeFormField,
    addFormField,
    updateFormField,
  } = props

  if (customActions) {
    return (
      <div className='border-t'>
        {customFields?.map((item: any, index: number) => {
          const onChangeFormPath = (event: any) => {
            updateFormField(event.target.value, index, 'path')
          }

          const updateFormEvents = (value: string) => {
            updateFormField(value, index, 'events')
          }

          return (
            <div className={`flex flex-1 px-1 space-x-2`} key={index}>
              <div className='flex flex-1 flex-col'>
                <TextField
                  autoFocus
                  color='secondary'
                  margin='dense'
                  className='flex-1'
                  value={item.path}
                  placeholder={'Path name'}
                  required
                  onChange={onChangeFormPath}
                />
                <InputActionsEvents
                  path={item.path}
                  updateFormEvents={updateFormEvents}
                />
              </div>
              {customFields.length > 1 ? (
                <IconButton
                  aria-label='add Actions field'
                  onClick={() => removeFormField(index)}
                >
                  <GrSubtractCircle />
                </IconButton>
              ) : null}
              {index === customFields.length - 1 ? (
                <IconButton
                  aria-label='add Actions field'
                  onClick={addFormField}
                >
                  <GrAddCircle />
                </IconButton>
              ) : null}
            </div>
          )
        })}
      </div>
    )
  }
  return null
}

export const InputActions = memo(InputActionsComponent)
