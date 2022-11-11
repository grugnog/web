import { SkeletonProps, Skeleton } from './skeleton'

interface Props {
  height?: string | number
  width?: string | number
}

export function TextSkeleton({
  height = '9.5',
  width = '18%',
  style,
  className,
}: SkeletonProps & Props) {
  return <Skeleton className={className} style={{ ...style, height, width }} />
}
