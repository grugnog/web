const dev = process.env.NODE_ENV !== 'production'

const DEFAULT_API_URL = '127.0.0.1:3280'

const api = process.env.API || `http://${DEFAULT_API_URL}/graphql`

const AppConfig = {
  graphQLUrl: api,
  graphQLUrlDocker: api,
  webSocketUrl: process.env.WEB_SOCKET_URL || `ws://${DEFAULT_API_URL}/graphql`,
}

// INTERCOM MESSAGER
const INTERCOM_APPID = process.env.INTERCOM_APPID
const INTERCOM_ENABLED = process.env.INTERCOM_ENABLED
// GOOGLE AUTH
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
// STRIPE
const STRIPE_KEY =
  process.env.STRIPE_KEY || 'pk_test_enc1gdton1T8NXa7dP5VOlHM00EyC4zqsX' // stripe.com default test key

const APP_TYPE = process.env.APP_TYPE || 'main'

// browser facing (proxy access from central api)
const cdn = process.env.CDN || 'http://localhost:8090'

const SCRIPTS_CDN_URL_HOST = /localhost/.test(cdn)
  ? `${cdn}/cdn`
  : `${cdn}/scripts`

const SUPER_MODE = process.env.SUPER_MODE
const DOMAIN_NAME = process.env.DOMAIN_NAME
const companyName = process.env.COMPANY_NAME || 'A11yWatch'
const twitterSite = process.env.TWITTER_SITE || '@a11ywatcher'

// USED FOR REPORTS ( TODO REVISIT URL )
const BASE_GQL_URL = `${AppConfig?.graphQLUrl
  ?.replace('api.', '')
  ?.replace('8080', '3000')
  ?.replace('/graphql', '')}/reports`

const STATUS_URL = AppConfig?.graphQLUrl?.replace('/graphql', '/status')

export const REST_API = api.replace('/graphql', '')

export const isA11yWatch = /a11ywatch/.test(REST_API)

export {
  BASE_GQL_URL,
  STATUS_URL,
  DOMAIN_NAME,
  dev,
  AppConfig,
  SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID,
  GOOGLE_CLIENT_ID,
  APP_TYPE,
  STRIPE_KEY,
  SUPER_MODE,
  INTERCOM_ENABLED,
  cdn,
  companyName,
  twitterSite,
}
