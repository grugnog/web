import { PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
  onClick?: any
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: any
  iconButton?: boolean
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
  ...extra
}) => {
  const iconBtnStyles = iconButton
    ? 'border-0 text-lg py-3 px-3 rounded-3xl place-content-center place-items-center flex md:text-[1.15rem]'
    : 'rounded-2xl px-2 py-1.5 md:px-4 md:py-1.5'

  return (
    <button
      {...extra}
      style={style}
      type={type}
      disabled={disabled}
      className={classNames(
        'border min-w-[44px] hover:bg-gray-100 hover:shadow-md',
        iconBtnStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
