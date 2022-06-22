const { resolve } = require('path')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

const dev = process.env.NODE_ENV === 'development'
// replace with only exact domain name without protocol
const DOMAIN_NAME =
  process.env.NEXT_PUBLIC_DOMAIN_NAME ||
  process.env.DOMAIN_NAME ||
  'https://a11ywatch.com'

const env = {
  dev,
  APP_TYPE: process.env.APP_TYPE || 'main',
  API: process.env.API,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
  STRIPE_KEY: process.env.STRIPE_KEY,
  INTERCOM_APPID: process.env.INTERCOM_APPID,
  IFRAME_URL: process.env.IFRAME_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  CRISP_WEBSITE_ID: process.env.CRISP_WEBSITE_ID,
  NEXT_PUBLIC_DOMAIN_NAME: DOMAIN_NAME,
  INTERCOM_ENABLED: process.env.INTERCOM_ENABLED === 'true',
  SUPER_MODE: process.env.SUPER_MODE === 'true',
  DOCKER_CONTAINER: process.env.DOCKER_CONTAINER === 'true', // app is using docker runtime
  CDN: process.env.CDN, // single CDN for app assets
}

let domains = ['images.unsplash.com']

if (dev) {
  domains.push('127.0.0.1', 'localhost')
}

// comma seperated list of cdns to use
const CDN_HOST = process.env.CDN_URL_HOST

if (CDN_HOST) {
  if (CDN_HOST.includes(',')) {
    const temp = CDN_HOST.split(',')
    domains = domains.concat(temp)
  } else {
    domains.push(CDN_HOST)
  }
}

const aliases = {
  ['@app']: resolve(__dirname, './src'),
  ['@app-theme']: resolve(__dirname, './src/theme/main'),
  ['@app-strings']: resolve(__dirname, './src/content/strings/a11y'),
}

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
]

// // TODO: Replace with env variable for frame-ancestors rules
// if (DOMAIN_NAME.includes('a11ywatch')) {
//   const ContentSecurityPolicy = `
//     frame-ancestors 'self' https://*.a11ywatch.com https://*.a11ywatch.blog;
//   `
//   securityHeaders.push({
//     key: 'Content-Security-Policy',
//     value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
//   })
// }

module.exports = withPWA({
  pwa: {
    runtimeCaching,
    dest: 'public',
    mode: process.env.WORKBOX_MODE || 'production',
    disable: dev,
    publicExcludes: ['!robots.txt', '!sitemap.xml.gz'],
    buildExcludes: [
      /middleware-manifest\.json$/,
      /middleware-runtime.js$/,
      /_middleware.js$/,
      /_middleware.js.map$/,
      /_next\/server\/middleware-manifest\.json$/,
      /_next\/server\/middleware-runtime.js$/,
    ],
  },
  swcMinify: true,
  images: {
    domains,
  },
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
  compress: true,
  generateBuildId: async () =>
    process.env.SOURCE_VERSION
      ? `cust-next-build-${process.env.SOURCE_VERSION}`
      : null,
  env,
  cssModules: true,
  typescriptLoaderOptions: {
    transpileOnly: true,
  },
  poweredByHeader: false,
  webpack: (config) => {
    config.resolve.alias = Object.assign({}, config.resolve.alias, aliases)

    return config
  },
})
