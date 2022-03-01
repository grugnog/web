import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'
import React from 'react'
import { MyApp } from '../components/general/app'
import type { MergedApp } from '@app/types/page'

const App = ({ Component, pageProps }: MergedApp) => (
  <MyApp Component={Component} pageProps={pageProps} />
)

export default App
