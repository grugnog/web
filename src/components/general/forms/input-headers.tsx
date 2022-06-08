import React, { memo } from 'react'
import { TextField, IconButton } from '@material-ui/core'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'

// dynamic headers for forms
export function InputHeadersComponent({
  customHeader,
  customFields,
  removeFormField,
  addFormField,
  updateFormField,
}: any) {
  if (customHeader) {
    return (
      <>
        {customFields?.map((item: any, index: number) => {
          const inputKeyName = 'Key'
          const inputValueName = 'Value'

          return (
            <div className={`flex flex-1 px-1 space-x-2`} key={index}>
              <TextField
                autoFocus
                color='secondary'
                margin='dense'
                className='flex-1'
                value={item.key}
                placeholder={inputKeyName}
                required
                onChange={(event: any) =>
                  updateFormField(
                    event.target.value,
                    index,
                    inputKeyName.toLowerCase()
                  )
                }
              />
              <TextField
                color='secondary'
                margin='dense'
                className='flex-1'
                value={item.value}
                placeholder={inputValueName}
                onChange={(event: any) =>
                  updateFormField(
                    event.target.value,
                    index,
                    inputValueName.toLowerCase()
                  )
                }
                required
              />
              {customFields.length > 1 ? (
                <IconButton
                  aria-label='add header field'
                  onClick={() => removeFormField(index)}
                >
                  <GrSubtractCircle />
                </IconButton>
              ) : null}
              {index === customFields.length - 1 ? (
                <IconButton
                  aria-label='add header field'
                  onClick={addFormField}
                >
                  <GrAddCircle />
                </IconButton>
              ) : null}
            </div>
          )
        })}
      </>
    )
  }
  return null
}

export const InputHeaders = memo(InputHeadersComponent)
