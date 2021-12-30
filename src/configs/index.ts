/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export {
  DOMAIN_NAME,
  INTERCOM_ENABLED,
  AppConfig,
  SCRIPTS_CDN_URL_HOST,
  INTERCOM_APPID,
  GOOGLE_CLIENT_ID,
  APP_TYPE,
  STRIPE_KEY,
  SUPER_MODE,
  API_URI_DOCKER,
  dev,
  cdn,
} from './app-config'
export { getAPIRoute, API_ENDPOINT } from './api-route'
export {
  Routes,
  LoggedInRoutes,
  LOGGIN_ROUTES,
  SHARED_ROUTES,
  GQL_ROUTES,
} from './routes'
export { features } from './features'
export { priceConfig } from './page-configs'
export { PRIVATE_KEY, PUBLIC_KEY } from './keys'
