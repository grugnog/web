import { FC, PropsWithChildren } from 'react'

type SectionContainerProps = PropsWithChildren<{
  className?: string
  id?: string
  gapY?: boolean
  gapX?: boolean
  container?: boolean
  block?: boolean
}>

const SectionContainer: FC<SectionContainerProps> = ({
  children,
  className,
  gapY = true,
  gapX = true,
  container,
  block,
  ...props
}) => {
  return (
    <section
      className={[gapY ? 'mt-20' : '', gapX ? 'px-4' : '', className]
        .join(' ')
        .trim()}
      {...props}
    >
      {container ? (
        <div className={`block md:flex place-items-center pb-0 gap-x-10`}>
          {block ? <div className={'flex-1 pb-4'}>{children}</div> : children}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

export { SectionContainer }
