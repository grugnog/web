import { memo } from 'react'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { useInputActionsEvents } from '../hooks/input-actions-events'
import { ActionsSelectInput } from '../select/actions-input'
import { Button } from '../buttons'

function InputActionsEventsComponent({
  updateFormEvents,
  path,
}: {
  path: string
  updateFormEvents?: (a: any) => void
}) {
  const { customFields, removeFormField, addFormField, updateFormField } =
    useInputActionsEvents()

  if (path) {
    return (
      <div className='py-1'>
        {customFields?.map((_item: any, index: number) => {
          const onStandardChange = (value: string) => {
            updateFormField(value, index, 'events')
            // use events setting here

            if (updateFormEvents) {
              updateFormEvents(customFields.map((item) => item.events))
            }
          }

          return (
            <div className={`flex flex-1 px-1 space-x-2`} key={index}>
              <ActionsSelectInput
                onStandardChange={onStandardChange}
                path={path}
              />
              {customFields.length > 1 ? (
                <Button
                  aria-label='add Actions field'
                  onClick={() => removeFormField(index)}
                  iconButton
                >
                  <GrSubtractCircle color='gray' className='GrIcon' />
                </Button>
              ) : null}
              {index === customFields.length - 1 ? (
                <Button
                  aria-label='add Actions field'
                  onClick={addFormField}
                  iconButton
                >
                  <GrAddCircle color='gray' className='GrIcon' />
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

export const InputActionsEvents = memo(InputActionsEventsComponent)
