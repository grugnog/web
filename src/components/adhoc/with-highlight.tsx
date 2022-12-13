import { a11yDark } from '@app/styles'
import { PrismLight } from 'react-syntax-highlighter'

const WithHighlight = ({ setScript, children, ...extraProps }: any) => {
  return (
    <PrismLight
      style={a11yDark}
      className={`text-sm max-h-[60vh]`}
      language='html'
      useInlineStyles
      {...extraProps}
    >
      {children}
    </PrismLight>
  )
}

export { WithHighlight }
