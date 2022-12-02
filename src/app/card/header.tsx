import React from 'react'

// card props
export type CardHeaderProps = {
  title?: string
  subheader?: string
  className?: string
  style?: React.CSSProperties
}

// standard card header title, subheader
export const CardHeader = ({ title, subheader, className, style }: CardHeaderProps) => {
  return (
    <div className={className} style={style}>
      <div className='px-4 py-2 gap-y-2'>
        <div className='text-base font-semibold text-gray-700'>
         {title}
        </div>
        <div className='text-gray-600'>
         {subheader}
        </div>
      </div>
    </div>
  )
}
