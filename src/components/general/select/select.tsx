import { classNames } from '@app/utils/classes'
import {
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ForwardedRef,
} from 'react'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  data: any[] //
}

export const Select = forwardRef(function Select(
  { className, data, onChange, value, ...props }: InputProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  return (
    <select
      ref={ref}
      value={value}
      onChange={onChange}
      className={classNames(
        'text-sm border-0 m-0 hover:bg-gray-100 rounded py-1.5'
      )}
      {...props}
    >
      {data.map((v: any) => (
        <option value={v} key={v} className={'text-sm'}>
          {v && String(v)?.toUpperCase()}
        </option>
      ))}
    </select>
  )
})
