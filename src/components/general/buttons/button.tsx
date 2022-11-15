import { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
  onClick?: any
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: any
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
  ...extra
}) => {
  return (
    <button
      style={style}
      type={type}
      disabled={disabled}
      className={classNames(
        'px-2 py-1 md:px-4 md:py-1.5 border rounded-2xl hover:bg-gray-200 hover:shadow-md min-w-[44px]',
        className
      )}
      {...extra}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
