import { Switch } from '@headlessui/react'
import { classNames } from '@app/utils/classes'
import { DetailedHTMLProps, FC, HTMLAttributes, PropsWithChildren } from 'react'

interface SwitchInputProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  checked?: boolean
  value?: string
  onChange(x: any): any
}

export const SwitchInput: FC<PropsWithChildren<SwitchInputProps>> = ({
  children,
  checked,
  value,
  id,
  className,
  onChange,
}) => {
  return (
    <Switch
      id={id}
      checked={checked}
      onChange={onChange}
      className={classNames(
        `relative inline-flex h-4 w-10 items-center rounded-full bg-gray-300 overflow-y-visible`,
        className
      )}
    >
      {children || value ? (
        <span className='sr-only'>{children || value}</span>
      ) : null}
      <span
        className={`${
          checked
            ? 'translate-x-5 bg-gray-600 border border-gray-700'
            : 'translate-x-0 bg-gray-200 border border-gray-300'
        } inline-block h-5 w-5 transform rounded-full transition`}
      />
    </Switch>
  )
}
