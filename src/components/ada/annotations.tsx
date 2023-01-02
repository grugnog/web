import React from 'react'
import { Popover } from '@headlessui/react'

export function Annotations({
  contrastRatio,
  errorType,
  open,
}: {
  contrastRatio?: string
  errorType: 'warning' | 'error'
  open?: boolean
}) {
  return (
    <Popover.Button
      className={open ? 'z-1' : 'z-20'}
      style={{
        height: 60,
        width: 60,
        maxWidth: 60,
        maxHeight: 60,
        padding: 0,
        fontFamily: `system-ui, Roboto, Helvetica Neue, BlinkMacSystemFont, sans-serif`,
        fontSize: 22,
        fontWeight: 800,
        borderRadius: 30,
        boxShadow: '0 3px 5px 2px rgba(30, 30, 30, .4)',
        border: 0,
        position: 'absolute',
        background:
          errorType === 'error'
            ? 'linear-gradient(20deg, #EF6C00 10%, #E65100 95%)'
            : 'linear-gradient(20deg, #9E9D24 10%, #827717 95%)',
        color: '#000',
        zIndex: open ? 1 : 9998,
      }}
    >
      {contrastRatio && contrastRatio?.includes('.00') ? contrastRatio[0] : ''}
    </Popover.Button>
  )
}
