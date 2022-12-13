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

export const TextField = forwardRef(function TextField(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className={classNames(
        'px-4 py-3 border-2 border-blue-600 rounded focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 invalid:border-gray-700 invalid:text-gray-700',
        props?.className || ''
      )}
      ref={ref}
      {...props}
    ></input>
  )
})
