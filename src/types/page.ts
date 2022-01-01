/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { AppProps } from 'next/app'

export type AppComponent = AppProps['Component'] & {
  meta: any
  gql?: boolean
  intercom?: boolean
}

export interface InnerApp {
  Component: AppComponent
  pageProps: any
  name?: string
}

export interface MergedApp extends AppProps {
  Component: AppComponent
}

export interface MetaData {
  /** Meta data page title */
  title?: string
  /** Meta data page description */
  description?: string
  /** Enable apollo gql */
  gql?: boolean
  /** ID: Component name or page name used in meta information */
  name?: string
  /** Enable intercom composer */
  intercom?: boolean
}

export type PageProps = {
  name: string
  website?: any
  websiteUrl?: string
  title?: string
  links?: any[]
  stylesheets?: any[]
  metas?: any[]
}
