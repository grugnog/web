import { FC, PropsWithChildren } from 'react'

type SectionContainerProps = PropsWithChildren<{
  className?: string
  id?: string
  gapY?: boolean
}>

const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className,
  gapY = true,
  ...props
}) => {
  return (
    <section
      className={['overflow-visible', gapY ? 'py-10' : '', 'px-4', className]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </section>
  )
}

export { SectionContainer }
