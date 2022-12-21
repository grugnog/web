import { PropsWithChildren } from 'react'
import { Header } from './header'

type PageTitleProps = {
  title?: string
  rightButton?: JSX.Element | null
  className?: string
  id?: string
}

const classes = {
  title: 'text-xl md:text-2xl lg:text-3xl xl:text-4xl',
  topBlock: 'overflow-none',
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
        className={`${className ? `${className} ` : ''}${
          classes.title
        } flex items-center justify-between flex-wrap`}
      >
        <>
          <Header className={classes.title}>{renderTitle}</Header>
          {rightButton}
        </>
      </div>
    )
  }

  return (
    <Header
      id={id}
      className={`${className ? `${className} ` : ''}${classes.title} ${
        classes.topBlock
      }`}
    >
      {renderTitle}
    </Header>
  )
}

export { PageTitle }
