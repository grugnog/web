import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'

import Layout from '@app/components/layout'
import { ErrorBoundary } from '@app/components/general'
import { strings } from '@app/content/strings/a11y'
import type { MergedApp } from '@app/types/page'

const App = ({ Component, pageProps }: MergedApp) => {
  const baseProps = { Component, pageProps }
  const { name } = Component?.meta || strings?.meta

  return (
    <ErrorBoundary>
      <Layout {...baseProps}>
        <Component {...pageProps} name={name} />
      </Layout>
    </ErrorBoundary>
  )
}

export default App
