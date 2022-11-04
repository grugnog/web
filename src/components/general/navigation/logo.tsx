import { FC } from 'react'

interface Logo {
  width?: number
  height?: number
  id?: string
}
export const Logo: FC<Logo> = ({ width, height }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width || '44'}
      height={height || '44'}
      fill='none'
      viewBox='0 0 32 32'
    >
      <rect width='32' height='32' fill='#FFFEFE' />
      <ellipse cx='15.868' cy='16' fill='#000' rx='13.223' ry='13.115' />
      <rect width='8.264' height='8.197' x='16.694' y='19.279' fill='#fff' />
    </svg>
  )
}

export const SmallLogo = ({ className }: { className?: string }) => {
  return (
    <img
      src='/img/logo.svg'
      alt='A11yWatch logo'
      width={'25.5'}
      height={'25.5'}
      className={className}
      style={{ margin: 0 }}
    />
  )
}
