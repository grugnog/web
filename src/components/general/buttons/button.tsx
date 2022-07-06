import React from 'react'

export const Button: React.FC<{
  onClick?: any
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: any
}> = ({
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
      className={[
        'px-2 py-0.5 md:px-4 md:py-1.5 border-2 rounded hover:bg-gray-200 hover:shadow-md min-h-[43px] min-w-[44px]',
        className,
      ]
        .join(' ')
        .trim()}
      {...extra}
      onClick={onClick}
    >
      {children}
    </button>
  )
}