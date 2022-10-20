import { FC } from 'react'

interface Logo {
  width?: number
  height?: number
  id?: string
}
export const Logo: FC<Logo> = ({ width, height, id }) => {
  // todo: look into useId
  const identifer = id ?? 'paint0_linear_2_23'

  return (
    <svg
      width={width || '44'}
      height={height || '44'}
      viewBox={'0 0 27 27'}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>A11yWatch Logo</title>
      <path
        d='M26.4463 13.1148C26.4463 20.3578 20.5261 26.2295 13.2231 26.2295C5.9202 26.2295 0 20.3578 0 13.1148C0 5.87168 5.9202 0 13.2231 0C20.5261 0 26.4463 5.87168 26.4463 13.1148Z'
        fill={`url(#${identifer})`}
      />
      <rect
        x='14.0496'
        y='16.3934'
        width='8.26446'
        height='8.19672'
        fill='#140202'
      />
      <defs>
        <linearGradient
          id={identifer}
          x1='13'
          y1='-12.5'
          x2='13'
          y2='42.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FB7525' stopOpacity='0' />
          <stop stopColor='#ED610E' stopOpacity='0.911458' />
          <stop stopColor='#F16511' />
          <stop offset='0.0001' stopColor='#FB7525' stopOpacity='0' />
          <stop offset='0.0002' stopColor='#F57123' stopOpacity='0.263886' />
          <stop offset='0.552083' stopColor='#F5620A' stopOpacity='0.911458' />
          <stop offset='0.650942' stopColor='#FA5E00' stopOpacity='0.911458' />
          <stop offset='0.765725' stopColor='#F5630C' stopOpacity='0.911458' />
          <stop offset='1' stopColor='#FC5E00' stopOpacity='0.56' />
        </linearGradient>
      </defs>
    </svg>
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
