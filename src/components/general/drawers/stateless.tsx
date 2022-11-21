import { FC, PropsWithChildren } from 'react'
import { Container } from '@material-ui/core'

export const StateLessDrawer: FC<
  PropsWithChildren<{
    initClosed?: boolean
    maxWidth?: false | 'lg' | 'xl' | 'sm' | 'md' | 'xs' | undefined
    footerSpacing?: boolean
    index?: number
  }>
> = ({ children, initClosed, maxWidth = 'lg', footerSpacing, index }) => {
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
        <Container
          maxWidth={maxWidth}
          style={{ paddingLeft: padding, paddingRight: padding }}
        >
          <div>{children}</div>
        </Container>
      )}
    </main>
  )
}
