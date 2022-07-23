import { makeStyles } from '@material-ui/core/styles'
import { a11yDark } from '@app/styles'
import { PrismLight } from 'react-syntax-highlighter'

const useStyles = makeStyles(() => ({
  code: {
    fontSize: '12px',
    '&::-webkit-scrollbar': {
      background: '#424242',
      height: 7,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#1b1b1b',
      borderRadius: 0,
      border: 0,
    },
  },
}))

const WithHighlight = ({ setScript, children, ...extraProps }: any) => {
  const classes = useStyles()

  return (
    <PrismLight
      style={a11yDark}
      className={classes.code}
      language='html'
      useInlineStyles
      {...extraProps}
    >
      {children}
    </PrismLight>
  )
}

export { WithHighlight }
