import { getSize, TWSize } from '@app/styles/tw'
import { FC, PropsWithChildren } from 'react'

export const StateLessDrawer: FC<
  PropsWithChildren<{
    size?: TWSize
    index?: number
  }>
> = ({ children, size = 'lg' }) => {
  return (
    <main className={`pb-10 pt-1 overflow-hidden`} id='main-content'>
      <div
        className={`mx-auto container px-2 ${
          size ? getSize(size) : 'sm:max-w-lg'
        }`}
      >
        <div>{children}</div>
      </div>
    </main>
  )
}
