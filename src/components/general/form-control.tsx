import { classNames } from '@app/utils/classes'
import {
  DetailedHTMLProps,
  FC,
  LabelHTMLAttributes,
  PropsWithChildren,
} from 'react'

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  visible?: boolean
  disabled?: boolean // is the input disabled
  id?: string
}

export const FormControl: FC<PropsWithChildren<LabelProps>> = ({
  disabled,
  htmlFor,
  visible,
  id,
  children,
}) => {
  return (
    <label
      className={classNames(
        `${visible ? 'text-sm' : 'sr-only'}`,
        disabled ? 'text-gray-500' : ''
      )}
      htmlFor={htmlFor}
      id={id}
    >
      {children}
    </label>
  )
}
