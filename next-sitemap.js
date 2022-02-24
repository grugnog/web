/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

module.exports = {
  siteUrl: process.env.DOMAIN_NAME || 'https://a11ywatch.com',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/alerts',
    '/dashboard',
    '/website-analytics',
    '/issues',
    '/cdn-fix',
    '/scripts',
    '/history',
    '/payments',
    '/urgent-issues',
    '/web-issues',
    '/website-details',
    '/profile',
    '/api',
    '/404',
    '/500',
    '/offline',
    '/reports/[...slug]',
  ],
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: ['/*'],
        disallow: [
          '/*?*',
          '/api/*',
          '/website-details/*',
          '/iframe/*',
          '/dashboard',
          '/alerts',
          '/dashboard',
          '/alerts',
          '/profile',
          '/website-analytics',
          '/cdn-fix',
          '/web-issues',
          '/scripts',
          '/history',
          '/urgent-issues',
          '/payments',
        ],
      },
    ],
  },
}
