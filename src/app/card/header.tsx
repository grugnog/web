import React from 'react'

// card props
export type CardHeaderProps = {
  title?: string
  subheader?: string
  className?: string
  style?: React.CSSProperties
  lg?: boolean
}

// standard card header title, subheader
export const CardHeader = ({
  title,
  subheader,
  className,
  style,
  lg
}: CardHeaderProps) => {
  return (
    <div className={className} style={style}>
      <div className='px-4 py-2 gap-y-2'>
        <div className={`${lg ? "text-3xl" : "text-xl"} font-semibold text-gray-700`}>{title}</div>
        <div className={`${lg ? "text-xl" : "text-lg"} text-gray-600`}>{subheader}</div>
      </div>
    </div>
  )
}
