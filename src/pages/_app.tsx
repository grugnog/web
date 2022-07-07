import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'
import { MyApp } from '../components/general/app'
import type { MergedApp } from '@app/types/page'
import { useStaticRendering as enableMobxStaticRendering } from 'mobx-react-lite'
import Layout from '@app/components/layout'

if (typeof window === 'undefined') {
  enableMobxStaticRendering(true)
}

const App = ({ Component, pageProps }: MergedApp) => {
  const baseProps = { Component, pageProps }

  return (
    <Layout {...baseProps}>
      <MyApp {...baseProps} />
    </Layout>
  )
}

export default App
