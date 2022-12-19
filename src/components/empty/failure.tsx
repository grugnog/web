import React from 'react'

export function Failure({
  title = 'Website not found',
  subTitle = 'Please check your url and try again.',
}: {
  title?: string
  subTitle?: string
}) {
  return (
    <div className='p-3'>
      <h2 className='text-3xl font-semibold'>{title}</h2>
      <div className='text-xl'>{subTitle}</div>
    </div>
  )
}
