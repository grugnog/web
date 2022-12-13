import { outlineStyles } from '@app/styles/buttons/outline'
import { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
  onClick?: any
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: any
  iconButton?: boolean
  outline?: boolean // display outline styles
  title?: string // button title hover
}>

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled,
  type = 'button',
  style,
  iconButton,
  outline,
  ...extra
}) => {
  return (
    <button
      {...extra}
      style={style}
      type={type}
      disabled={disabled}
      className={classNames(
        'border text-gray-800 min-w-[44px] hover:bg-gray-100 hover:shadow-md',
        iconButton
          ? 'border-0 text-lg py-3 px-3 rounded-3xl place-content-center place-items-center flex md:text-[1.15rem]'
          : 'rounded-2xl px-2 py-1.5 md:px-4 md:py-1.5',
        outline ? outlineStyles : '',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
