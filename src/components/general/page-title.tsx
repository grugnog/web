import { PropsWithChildren } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '3.2rem',
    fontWeight: 800,
    textOverflow: 'ellipsis',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.6rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.3rem',
      maxWidth: '95vw',
    },
  },
  topBlock: {
    overflow: 'hidden',
    paddingTop: 8,
  },
}))

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
  component = 'h1',
  children,
  className = '',
  id,
}: PropsWithChildren<PageTitleProps>) {
  const classes = useStyles()
  const renderTitle = title || children

  if (!renderTitle) {
    return null
  }

  if (rightButton) {
    return (
      <div
        className={`${className ? `${className} ` : ''}flex items-center ${
          classes.topBlock
        } justify-between flex-wrap`}
      >
        <>
          <Typography
            variant='h4'
            component={component}
            className={classes.title}
          >
            {renderTitle}
          </Typography>
          {rightButton}
        </>
      </div>
    )
  }

  return (
    <Typography
      variant='h4'
      id={id}
      component={component}
      className={`${className ? `${className} ` : ''}${classes.title} ${
        classes.topBlock
      }`}
    >
      {renderTitle}
    </Typography>
  )
}

export { PageTitle }
