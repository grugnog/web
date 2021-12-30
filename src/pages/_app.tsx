/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import '@app/stylesheets/main.css'
import '@a11ywatch/ui/css/tailwind.css'
import '@app/stylesheets/tailwind.css'
import React from 'react'
import { MyApp } from '../components/general/app'
import type { MergedApp } from '../types/page'

function App({ Component, pageProps }: MergedApp) {
  return <MyApp Component={Component} pageProps={pageProps} />
}

export default App
