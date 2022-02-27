import React from 'react'

export const Logo = () => {
  return (
    <img
      src='/img/logo_dark.svg'
      alt='A11yWatch logo'
      width={'51'}
      height={'30'}
    />
  )
}

export const SmallLogo = ({ className }: any) => {
  return (
    <img
      src='/img/logo_dark.svg'
      alt='A11yWatch logo'
      width={'25.5'}
      height={'15'}
      className={className}
    />
  )
}
