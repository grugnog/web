import { classNames } from '@app/utils/classes'
import { PropsWithChildren } from 'react'
import { Header } from './header'

type ViewConfigTitleProps = {
  title?: string
  className?: string
}

// determine layout for view one of all or selected website todo
function ViewConfigTitle({
  title = '',
  children,
  className = '',
}: PropsWithChildren<ViewConfigTitleProps>) {
  return (
    <div
      className={classNames(
        className,
        'flex items-center justify-between flex-wrap'
      )}
    >
      <>
        <Header className={'text-xl md:text-2xl lg:text-3xl xl:text-4xl'}>
          {title}
        </Header>
        {children}
      </>
    </div>
  )
}

export { ViewConfigTitle }
