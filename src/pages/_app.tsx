import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'

import Layout from '@app/components/layout'
import { ErrorBoundary } from '@app/components/general'
import type { InnerApp } from '@app/types/page'
import { AnalyticsHoc } from '@app/components/adhoc/analytics'
import Script from 'next/script'

const App = ({ Component, pageProps }: InnerApp) => {
  return (
    <ErrorBoundary>
      <Layout Component={Component} pageProps={pageProps} />
      {process.env.NEXT_PUBLIC_FATHOM_CODE ? <AnalyticsHoc /> : null}
      {process.env.NEXT_PUBLIC_REWARDS ? (
        <>
          <Script
            id='rewardful-refs'
            dangerouslySetInnerHTML={{
              __html: `(function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');`,
            }}
          ></Script>
          <Script
            src='/refs.js'
            data-rewardful={process.env.NEXT_PUBLIC_REWARDS}
            strategy={'lazyOnload'}
          ></Script>
        </>
      ) : null}
    </ErrorBoundary>
  )
}

export default App
