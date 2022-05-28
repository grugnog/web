import React from 'react'
import {
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@material-ui/core'
import { formDialogStyles as useStyles } from '../styles'

export enum Standard {
  'WCAG2A',
  'WCAG2AA',
  'WCAG2AAA',
}

export type StandardKeys = keyof typeof Standard

const standards = Object.values(Standard).filter(
  (value) => typeof value === 'string'
)

export interface InputProps {
  onStandardChange(
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ): void
  standard?: StandardKeys
}

export const WCAGSelectInput = ({ onStandardChange, standard }: InputProps) => {
  const classes = useStyles()

  return (
    <Tooltip title={'Select WCAG report standard.'}>
      <FormControl style={{ paddingLeft: 3 }}>
        <InputLabel
          id='extany-select-outlined-label'
          className='sr-only'
          style={{ marginTop: 0 }}
        >
          WCAG Standard
        </InputLabel>
        <Select
          labelId='extany-select-outlined-label'
          id='ext-select-outlined'
          value={standard}
          style={{ marginTop: 0, border: 'none' }}
          onChange={onStandardChange}
          classes={{
            selectMenu: classes.inputSelect,
          }}
        >
          {standards.map((value: any) => (
            <MenuItem
              value={value}
              key={value}
              dense
              style={{ fontSize: '1rem' }}
            >
              {value && String(value)?.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  )
}
