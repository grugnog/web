import { classNames } from '@app/utils/classes'
import {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ForwardedRef,
} from 'react'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export const Checkbox = forwardRef(function Checkbox(
  { className, value, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      type={'checkbox'}
      className={classNames(
        'px-4 py-3 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-gray-700 invalid:text-gray-700',
        className || ''
      )}
      value={value}
      ref={ref}
      {...props}
    ></input>
  )
})
