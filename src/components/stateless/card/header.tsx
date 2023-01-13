import React, { FC, PropsWithChildren } from 'react'

// card props
export type CardHeaderProps = {
  title?: string
  subheader?: string
  className?: string
  style?: React.CSSProperties
  lg?: boolean
}

// standard card header title, subheader
export const CardHeader: FC<PropsWithChildren<CardHeaderProps>> = ({
  title,
  subheader,
  className,
  style,
  lg,
  children,
}) => {
  return (
    <div className={className} style={style}>
      <div className='px-4 py-2 gap-y-2'>
        <div className={`${lg ? 'text-3xl' : 'text-xl'} font-semibold `}>
          {title}
        </div>
        <div
          className={`pb-3 ${
            lg ? 'text-xl' : 'text-lg'
          } text-gray-600 dark:text-gray-300`}
        >
          {subheader}
        </div>
        {children}
      </div>
    </div>
  )
}
