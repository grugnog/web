import { useState } from 'react'

type Field = { path: string; events: string[] }

// actions events for website
export function useInputActions(
  options?: Field[] | { customFields?: Field[] }
) {
  const fields = (Array.isArray(options) ? options : options?.customFields) || [
    { path: '', events: [] },
  ]
  const [customActions, setCustomActions] = useState(false)
  const [customFields, setCustomField] = useState(fields)

  const addFormField = () => {
    const newFields = customFields.slice()
    newFields.push({ path: '', events: [] })
    setCustomField(newFields)
  }

  const updateFormField = (value: any, index: number, type: string) => {
    const cloneField = customFields?.map((item: any, i: number) => {
      if (i === index) {
        item[type] = value
      }
      return item
    })
    setCustomField(cloneField)
  }

  const removeFormField = (index: number) => {
    const newFields = customFields.slice()
    newFields.splice(index, 1)
    setCustomField(newFields)
  }

  return {
    removeFormField,
    updateFormField,
    addFormField,
    customFields,
    customActions,
    setCustomActions,
  }
}
