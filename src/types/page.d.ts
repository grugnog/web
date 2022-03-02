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
}

export interface BlogPageProps extends PageProps {
  html: string
  title?: string
  links: any[]
  stylesheets: any[]
  metas: any[]
  headScripts: any[]
  bodyScripts: any[]
}