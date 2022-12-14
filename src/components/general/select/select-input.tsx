import React from 'react'

// accessibility standards to test
export enum Standard {
  'WCAG2A',
  'WCAG2AA',
  'WCAG2AAA',
  'Section508',
}

// todo: remove type and reverse enum map instead
export type AccessibilityStandardKeys = keyof typeof Standard | string

const standards = Object.values(Standard).filter(
  (value) => typeof value === 'string'
)

export interface InputProps {
  onStandardChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void
  standard?: AccessibilityStandardKeys
  spacing?: boolean
}

export const WCAGSelectInput = ({
  onStandardChange,
  standard,
  spacing,
}: InputProps) => {
  return (
    <div>
      <label htmlFor='ext-select-outlined' className='sr-only'>
        Accessibility Standard
      </label>
      <select
        id='ext-select-outlined'
        value={standard}
        onChange={onStandardChange}
        className={`text-sm border-0 m-0 hover:bg-gray-100 rounded py-1.5${
          spacing ? ' px-2' : ''
        }`}
      >
        {standards.map((value: any) => (
          <option value={value} key={value} className={'text-sm'}>
            {value && String(value)?.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  )
}
