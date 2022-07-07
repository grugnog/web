import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'
import type { MergedApp } from '@app/types/page'
import Layout from '@app/components/layout'
import { ErrorBoundary, SkipContent, SnackBar } from '@app/components/general'
import { strings } from '@app/content/strings/a11y'

const App = ({ Component, pageProps }: MergedApp) => {
  const baseProps = { Component, pageProps }
  const { name } = Component?.meta || strings?.meta

  return (
    <Layout {...baseProps}>
      <ErrorBoundary>
        <SkipContent />
        <Component {...pageProps} name={name} />
        <SnackBar />
      </ErrorBoundary>
    </Layout>
  )
}

export default App
