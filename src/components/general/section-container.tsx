import { FC, PropsWithChildren } from 'react'

type SectionContainerProps = PropsWithChildren<{
  className?: string
  id?: string
  gapY?: boolean
  gapX?: boolean
}>

const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className,
  gapY = true,
  gapX = true,
  ...props
}) => {
  return (
    <section
      className={[gapY ? 'mt-14' : '', gapX ? 'px-4' : '', className]
        .join(' ')
        .trim()}
      {...props}
    >
      {children}
    </section>
  )
}

export { SectionContainer }
