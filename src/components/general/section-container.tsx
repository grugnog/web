import React, { FC } from 'react'

const SectionContainer: FC<{
  className?: string
  id?: string
  gapY?: boolean
}> = ({ children, className, gapY = true, ...props }) => {
  return (
    <section
      className={['overflow-visible', gapY ? 'py-32' : '', 'px-4', className]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </section>
  )
}

export { SectionContainer }
