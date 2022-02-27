import React from 'react'
import { Box } from '@a11ywatch/ui'

export function Failure({
  title = 'Website not found',
  subTitle = 'Please check your url and try again.',
}: {
  title?: string
  subTitle?: string
}) {
  return (
    <Box>
      <h2 className='text-3xl font-semibold'>{title}</h2>
      <div className='text-xl'>{subTitle}</div>
    </Box>
  )
}
