import React from 'react'

export const PaperSection = ({
  children,
  style = {},
}: {
  children: any
  rightMargin?: any
  style?: any
  row?: boolean
}) => {
  return (
    <div className={`flex flex-col p-6 relative border rounded`} style={style}>
      {children}
    </div>
  )
}
