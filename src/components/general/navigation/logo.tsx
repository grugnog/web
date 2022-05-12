import React from 'react'

interface Logo {
  width?: number
  height?: number
}
export const Logo = ({ width, height }: Logo) => {
  return (
    <img
      src='/img/logo.svg'
      alt='A11yWatch logo'
      width={width || '51'}
      height={height || '30'}
    />
  )
}

export const SmallLogo = ({ className }: any) => {
  return (
    <img
      src='/img/logo.svg'
      alt='A11yWatch logo'
      width={'25.5'}
      height={'15'}
      className={className}
    />
  )
}
