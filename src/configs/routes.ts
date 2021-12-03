/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const Routes = [
  {
    nav: false,
    href: '/terms-of-service',
    name: 'Terms of Service',
    type: 'legal',
  },
  {
    nav: false,
    href: '/faq',
    name: 'FAQ',
    type: 'resources',
  },
  {
    nav: false,
    href: '/privacy',
    name: 'Privacy Policy',
    type: 'legal',
  },
  {
    nav: false,
    href: '/contact',
    name: 'Contact',
    type: 'company',
  },
  {
    nav: false,
    href: '/about',
    name: 'About',
    type: 'company',
  },
  {
    nav: false,
    href: '/roadmap',
    name: 'Roadmap',
    type: 'explore',
  },
  {
    nav: false,
    href:
      'https://chrome.google.com/webstore/detail/a11ywatch/opefmkkmhchekgcmgneakbjafeckbaag?hl=en&authuser=0',
    name: 'Chrome Extension',
    type: 'explore',
  },
  {
    nav: false,
    href: '/api-info',
    name: 'API',
    type: 'explore',
  },
  {
    nav: false,
    href: '/consulting',
    name: 'Consulting',
    type: 'resources',
  },
  // {
  //   nav: false,
  //   href: 'https://a11ywatch.blog',
  //   name: 'Blog',
  //   type: 'company',
  // },
  {
    nav: false,
    href: 'https://a11ywatch.github.io/docs',
    name: 'Docs',
    type: 'resources',
  },
  {
    nav: false,
    href: '/website-accessibility-checker',
    name: 'Accessibility Scan',
    type: 'explore',
  },
  {
    nav: false,
    href: '/reset-password',
    name: 'Reset Password',
    type: 'resources',
  },
  {
    nav: false,
    href: '/web-accessibility',
    name: 'Web Accessibility',
    type: 'resources',
  },
  {
    nav: true,
    href: '/features',
    name: 'Features',
    type: 'resources',
  },
  {
    nav: true,
    href: '/pricing',
    name: 'Pricing',
    type: 'company',
  },
  {
    nav: true,
    href: '/testout',
    name: 'Try Out',
    type: 'explore',
  },
  {
    nav: false,
    href: 'https://a11ywatch.statuspage.io',
    name: 'Status',
    type: 'resources',
  },
  {
    nav: true,
    href: '/login',
    name: 'Login',
  },
  {
    nav: true,
    href: '/register',
    name: 'Register',
  },
  {
    nav: false,
    href: '/careers',
    name: 'Careers',
    type: 'company',
  },
]

export const LoggedInRoutes = [
  {
    nav: true,
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    nav: true,
    href: '/profile',
    name: 'Profile',
  },
  {
    nav: true,
    href: '/api-info',
    name: 'API',
  },
  {
    nav: false,
    href: '/pricing',
    name: 'Pricing',
  },
  {
    nav: false,
    href: '/register',
    name: 'Register',
  },
  {
    nav: false,
    href: '/login',
    name: 'Login',
  },
]

/*
 * Determine what routes make the auth profile menu appear
 *
 */
export const LOGGIN_ROUTES = [
  '/alerts',
  '/dashboard',
  '/website-details',
  '/profile',
  '/cdn-fix',
  '/analytics',
  '/scripts',
  '/urgent',
  '/history',
  '/web-issues',
  '/payments',
  '/urgent-issues',
]

export const SHARED_ROUTES = [
  '/api-info',
  '/pricing',
  '/api/iframe',
  '/reports',
]
