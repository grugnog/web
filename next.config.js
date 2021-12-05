/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

const { resolve } = require('path')
const { parsed } = require('dotenv').config()
const { domainMap } = require('./domain-map')
const { generateSiteMap } = require('./generate-sitemap')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const dev = process.env.NODE_ENV !== 'production'
const DOMAIN_NAME = process.env.DOMAIN_NAME || 'https://a11ywatch.com'

const env = Object.assign({}, parsed, {
  dev,
  APP_TYPE: process.env.APP_TYPE || 'main',
  API: process.env.API,
  API_URI_DOCKER: process.env.API_URI_DOCKER,
  WEB_SOCKET_URL: process.env.WEB_SOCKET_URL,
  STRIPE_KEY:
    process.env.STRIPE_KEY_PROD && !dev
      ? process.env.STRIPE_KEY_PROD
      : process.env.STRIPE_KEY,
  SCRIPTS_CDN_URL_HOST:
    process.env.SCRIPTS_CDN_URL_HOST_PROD && !dev
      ? process.env.SCRIPTS_CDN_URL_HOST_PROD
      : process.env.SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID: process.env.INTERCOM_APPID,
  IFRAME_URL: process.env.IFRAME_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  DONORBOX_URL: process.env.DONORBOX_URL,
  DOMAIN_NAME,
  INTERCOM_ENABLED: process.env.INTERCOM_ENABLED,
  // single CDN for app assets
  CDN: process.env.CDN,
  // # NEXT.JS REQUIRED EXCLUDES
  NODE_ENV: undefined,
  NODE_MODULES_CACHE: undefined,
})

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

const { themeType, stringType } = domainMap(process.env.APP_TYPE)

const aliases = {
  ['@app']: resolve(__dirname, './src'),
  ['@app-theme']: resolve(__dirname, `./src/theme/${themeType}`),
  ['@app-strings']: resolve(__dirname, `./src/content/strings/${stringType}`),
  ['@app-config']: resolve(__dirname, './web-config.js'),
  'react-native$': 'react-native-web',
}

module.exports = withPWA({
  pwa: {
    dest: 'public',
    mode: process.env.WORKBOX_MODE || 'production',
    disable: dev,
    publicExcludes: ['!robots.txt', '!sitemap.xml.gz'],
    buildExcludes: [
      /middleware-manifest\.json$/,
      /_middleware.js$/,
      /_middleware.js.map$/,
    ],
    runtimeCaching,
  },
  trailingSlash: false,
  swcMinify: true,
  images: {
    domains: domains,
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
  webpack: (config, { dev: development, webpack }) => {
    generateSiteMap(DOMAIN_NAME).catch((e) => console.error(e))

    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/tests$/,
      })
    )

    config.resolve.alias = Object.assign({}, config.resolve.alias, aliases)

    if (!development) {
      if (!Array.isArray(config.optimization.minimizer)) {
        config.optimization.minimizer = []
      }
      config.optimization.minimize = true
      config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin())
    }

    return config
  },
})
