import React, { PropsWithChildren } from 'react'
import { Header } from '@app/components/general/header'

type PageTitleProps = {
  title?: string
  rightButton?: JSX.Element | null
  component?: 'h1' | 'h2' | 'h3'
  className?: string
  id?: string
}

function PageTitle({
  title = '',
  rightButton = null,
  children,
  className = '',
  id,
}: PropsWithChildren<PageTitleProps>) {
  const renderTitle = title || children

  if (!renderTitle) {
    return null
  }

  if (rightButton) {
    return (
      <div
        className={`${
          className ? `${className} ` : ''
        }flex items-center justify-between flex-wrap overflow-hidden`}
      >
        <>
          <Header>{renderTitle}</Header>
          {rightButton}
        </>
      </div>
    )
  }

  return (
    <Header id={id} className={'overflow-hidden'}>
      {renderTitle}
    </Header>
  )
}

export { PageTitle }
