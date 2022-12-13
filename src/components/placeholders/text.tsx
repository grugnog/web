import { SkeletonProps, Skeleton } from './skeleton'

type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'

interface Props {
  height?: string | number
  width?: string | number
  size?: TextSize
}

// get the height based off the tw height
const getHeight = (size: TextSize) => {
  let h = 18
  switch (size) {
    case 'xs': {
      h = 16
      break
    }
    case 'sm': {
      h = 20
      break
    }
    case 'base': {
      h = 22.875
      break
    }
    case 'lg': {
      h = 26.875
      break
    }
    case 'xl': {
      h = 28.875
      break
    }
    case '2xl': {
      h = 32.875
      break
    }
    case '3xl': {
      h = 36.875
      break
    }
    case '4xl': {
      h = 40.875
      break
    }
    case '5xl': {
      h = 46.875
      break
    }
    default: {
      h = 22.875
      break
    }
  }

  return h
}

export function TextSkeleton({
  height = 22.875,
  width = '18%',
  style,
  className,
  size,
}: SkeletonProps & Props) {
  return (
    <Skeleton
      className={className}
      style={{ ...style, height: size ? getHeight(size) : height, width }}
    />
  )
}
