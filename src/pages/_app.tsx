import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'
import React from 'react'
import { MyApp } from '../components/general/app'
import type { MergedApp } from '@app/types/page'
import { useStaticRendering as enableMobxStaticRendering } from 'mobx-react'

if (typeof window === 'undefined') {
  enableMobxStaticRendering(true)
}

const App = ({ Component, pageProps }: MergedApp) => (
  <MyApp Component={Component} pageProps={pageProps} />
)

export default App
