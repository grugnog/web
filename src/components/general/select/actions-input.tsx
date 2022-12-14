import React, { useState } from 'react'
import { FormControl } from '../form-control'
import { TextField } from '../text-field'
import { Select } from './select'

export enum Standard {
  'WAIT_FOR_ELEMENT',
  'CLICK_ELEMENT',
  'SET_FIELD',
  'CLEAR_FIELD',
  'CHECK_FIELD',
  'UNCHECK_FIELD',
}

export enum WAIT_OPTIONS {
  'ADDED',
  'REMOVED',
  'VISIBLE',
  'HIDDEN',
  'EMIT_LOAD',
  'EMIT_LOADED',
}

export type StandardKeys = keyof typeof Standard

const standards = Object.values(Standard).filter(
  (value) => typeof value === 'string'
)

const waitOptions = Object.values(WAIT_OPTIONS).filter(
  (value) => typeof value === 'string'
)

export type WaitOptionKeys = keyof typeof WAIT_OPTIONS

export interface InputProps {
  onStandardChange(event: any): void
  standard?: StandardKeys
  path: string
}

// determine if the element select form should appear
const elementSelectForm = (value: string) => {
  let canSelect = false

  switch (value) {
    case Standard[0]: {
      canSelect = true
      break
    }
    case Standard[1]: {
      canSelect = true
      break
    }
    case Standard[2]: {
      canSelect = true
      break
    }
    case Standard[3]: {
      canSelect = true
      break
    }
    case Standard[4]: {
      canSelect = true
      break
    }
    case Standard[5]: {
      canSelect = true
      break
    }
    default: {
      canSelect = false
      break
    }
  }

  return canSelect
}

export const ActionsSelectInput = ({ onStandardChange, path }: InputProps) => {
  const [action, setAction] = useState<StandardKeys>(
    standards[0] as StandardKeys
  )
  const [waitFor, setWaitFor] = useState<WaitOptionKeys>(
    waitOptions[0] as WaitOptionKeys
  )
  const [selector, setSelector] = useState<string>('')
  const [selectorValue, setSelectorValue] = useState<string>('')

  const constructAction = () => {
    const actionName = action.replace(/\_/g, ' ').toLowerCase()
    const val = action === Standard[2] ? ` ${selectorValue}` : ''
    const waitVal =
      action === Standard[0]
        ? ` ${waitFor.replace(/\_/g, ' ').toLowerCase()}`
        : ''
    const sel = selector ? ` ${selector}` : ''

    onStandardChange(`${actionName}${sel}${val}${waitVal}`)
  }

  const onActionSelect = (e: React.ChangeEvent<any>) => {
    setAction(e.target.value)
  }

  const onElementChangeEvent = (e: React.ChangeEvent<any>) => {
    setSelector(e.target.value)
    constructAction()
  }

  const onWaitForChangeEvent = (e: React.ChangeEvent<any>) => {
    setWaitFor(e.target.value)
    constructAction()
  }

  const onSelectorValueEvent = (e: React.ChangeEvent<any>) => {
    setSelectorValue(e.target.value)
    constructAction()
  }

  const actionId = `${path}-action-select-outlined-label`
  const waitForId = `${path}-wait-action-select-outlined-label`

  return (
    <div className={'flex gap-x-2 flex-wrap place-items-center max-h-[50vh]'}>
      <>
        <FormControl htmlFor={actionId}>ACTION</FormControl>
        <Select
          id={actionId}
          value={action}
          style={{ marginTop: 0, border: 'none' }}
          onChange={onActionSelect}
          data={standards}
        />
      </>
      {elementSelectForm(action) ? (
        <>
          <FormControl htmlFor='element_selector'>Selector</FormControl>
          <TextField
            underline
            id='element_selector'
            value={selector}
            placeholder={'Element ex: #some_id'}
            required
            onChange={onElementChangeEvent}
          />
        </>
      ) : null}
      {action === Standard[2] ? (
        <>
          <FormControl htmlFor='element_value'>Value</FormControl>
          <TextField
            color='secondary'
            underline
            value={selectorValue}
            placeholder={'Element value'}
            required
            onChange={onSelectorValueEvent}
          />
        </>
      ) : null}
      {action === Standard[0] ? (
        <>
          <FormControl htmlFor={waitForId}>Options</FormControl>
          <Select
            id={waitForId}
            value={waitFor}
            style={{ marginTop: 0, border: 'none' }}
            onChange={onWaitForChangeEvent}
            data={waitOptions}
          />
        </>
      ) : null}
    </div>
  )
}
