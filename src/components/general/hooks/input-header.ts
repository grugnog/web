import { useState } from 'react'

type Field = { key: string; value: string }

export function useInputHeader(options?: Field[] | { customFields?: Field[] }) {
  const fields = (Array.isArray(options) ? options : options?.customFields) || [
    { key: '', value: '' },
  ]
  const [customHeader, setCustomHeader] = useState(false)
  const [customFields, setCustomField] = useState(fields)

  const addFormField = () => {
    const newFields = customFields.slice()
    newFields.push({ key: '', value: '' })
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
    customHeader,
    setCustomHeader,
  }
}
