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
        'px-2 py-2 md:px-4 md:py-3 border rounded hover:bg-gray-200',
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
