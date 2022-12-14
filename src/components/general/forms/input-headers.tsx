import { memo } from 'react'
import { GrAddCircle, GrSubtractCircle } from 'react-icons/gr'
import { Button } from '../buttons'
import { TextField } from '../text-field'

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
      <div className='border-t'>
        {customFields?.map((item: any, index: number) => {
          const inputKeyName = 'Key'
          const inputValueName = 'Value'

          return (
            <div className={`flex flex-1 px-1 space-x-2`} key={index}>
              <TextField
                autoFocus
                underline
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
                underline
                value={item?.value}
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
              {customFields?.length > 1 ? (
                <Button
                  aria-label='add header field'
                  onClick={() => removeFormField(index)}
                  iconButton
                >
                  <GrSubtractCircle />
                </Button>
              ) : null}
              {index === customFields?.length - 1 ? (
                <Button
                  aria-label='add header field'
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

export const InputHeaders = memo(InputHeadersComponent)
