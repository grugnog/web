import React, { FC } from 'react'

const SectionContainer: FC<{ className?: string; id?: string }> = ({
  children,
  className,
  ...props
}) => {
  return (
    <section
      className={['overflow-visible', 'py-32', 'px-6', className]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </section>
  )
}

export { SectionContainer }
