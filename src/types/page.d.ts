import { AppProps } from 'next/app'

export type AppComponent = AppProps['Component'] &
  Partial<MetaData> & {
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
  /** Params for initial gql queries [todo update generic] */
  params?: any
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
