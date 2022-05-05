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
  type,
  style,
  ...extra
}) => {
  return (
    <button
      style={style}
      type={type}
      disabled={disabled}
      className={['px-4 py-3 border rounded hover:bg-gray-200', className]
        .join(' ')
        .trim()}
      {...extra}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
