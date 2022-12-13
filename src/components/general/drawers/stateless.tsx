import { getSize, TWSize } from '@app/styles/tw'
import { FC, PropsWithChildren } from 'react'

export const StateLessDrawer: FC<
  PropsWithChildren<{
    initClosed?: boolean
    size?: TWSize
    footerSpacing?: boolean
    index?: number
  }>
> = ({ children, initClosed, size = 'lg', footerSpacing, index }) => {
  const padding = index ? 0 : '1rem'

  return (
    <main
      className={`pb-10 ${initClosed ? '' : 'pt-1 overflow-hidden'}${
        footerSpacing ? ' pb-[20vh]' : ''
      }`}
      id='main-content'
    >
      {initClosed ? (
        children
      ) : (
        <div
          className={`mx-auto container ${
            size ? getSize(size) : 'sm:max-w-lg'
          }`}
          style={{ paddingLeft: padding, paddingRight: padding }}
        >
          <div>{children}</div>
        </div>
      )}
    </main>
  )
}
