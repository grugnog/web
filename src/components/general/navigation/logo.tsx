import React from 'react'

interface Logo {
  width?: number
  height?: number
}
export const Logo = ({ width, height }: Logo) => {
  return (
    <img
      src='/img/logo_halloween.svg'
      alt='A11yWatch logo'
      width={width || '44'}
      height={height || '44'}
    />
  )
}

export const SmallLogo = ({ className }: { className?: string }) => {
  return (
    <img
      src='/img/logo_halloween.svg'
      alt='A11yWatch logo'
      width={'25.5'}
      height={'25.5'}
      className={className}
      style={{ margin: 0 }}
    />
  )
}
