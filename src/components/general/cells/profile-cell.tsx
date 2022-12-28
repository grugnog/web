import React from 'react'
import { TextSkeleton } from '@app/components/placeholders'

// TODO replace nested ternarys
export const ProfileCell = ({
  skeletonLoad,
  title,
  subTitle,
  className,
  titleClassName = '',
  children,
}: {
  skeletonLoad?: boolean
  title: string
  subTitle?: string
  titleClassName?: string // title class name
  className?: string // subtitle class name
  children?: any
}) => {
  // todo recompose
  if (children) {
    return (
      <div className='border py-2 px-3'>
        <div className='flex'>
          <p className={`text-xl font-medium ${titleClassName}`}>{title}</p>
          {children}
        </div>
        {skeletonLoad ? (
          <TextSkeleton className={className} size={'base'} />
        ) : subTitle ? (
          <p className={`text-base ${className}`}>{subTitle}</p>
        ) : null}
      </div>
    )
  }

  return (
    <div className='border py-2 px-3'>
      <p className={`text-xl font-medium ${titleClassName}`}>{title}</p>
      {skeletonLoad ? (
        <TextSkeleton className={className} size={'base'} />
      ) : subTitle ? (
        <p className={`text-base ${className}`}>{subTitle}</p>
      ) : null}
    </div>
  )
}
