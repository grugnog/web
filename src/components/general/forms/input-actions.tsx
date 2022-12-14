import { memo } from 'react'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { Button } from '../buttons'
import { TextField } from '../text-field'
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
                  underline
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
                <Button
                  aria-label='add Actions field'
                  onClick={() => removeFormField(index)}
                  iconButton
                >
                  <GrSubtractCircle />
                </Button>
              ) : null}
              {index === customFields.length - 1 ? (
                <Button
                  aria-label='add Actions field'
                  onClick={addFormField}
                  iconButton
                >
                  <GrAddCircle />
                </Button>
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
