import { exampleBase64 } from '@app/lib/mocks/example-base64'

export const websiteParamDefs = {
  url: {
    type: 'string',
    desc: 'The domain to add to your tracking list.',
    optional: false,
  },
  customHeaders: {
    type: 'string[{key: string, value: string}]',
    desc: 'An array of objects with key:value par for header configurations.',
    optional: true,
  },
  mobile: {
    type: 'boolean',
    desc: 'Is the testing done in mobile viewport?',
    optional: true,
  },
  standard: {
    type: 'string',
    desc: 'The WCAG2.1 standard to use ex: WCAG2A, WCAG2AA, and WCAG2AAA.',
    optional: true,
  },
}

const authParams = {
  email: {
    type: 'string',
    desc: 'The email account to login with.',
    optional: false,
  },
  password: {
    type: 'string',
    desc: 'The password to the email to login with.',
    optional: false,
  },
}

const crawlParams = {
  url: {
    type: 'string',
    desc: 'The url to crawl and gather reports.',
    optional: false,
  },
  subdomains: {
    type: 'boolean',
    desc: 'Include subdomains that match domain.',
    optional: false,
  },
  tld: {
    type: 'boolean',
    desc: 'Include all TLD extensions that match domain.',
    optional: false,
  },
  pageInsights: {
    type: 'boolean',
    desc:
      'Run with additional google lighthouse report. [Not required if configured]',
    optional: true,
  },
}

export const apiRoutes = [
  {
    title: 'Authentication & User',
    id: 'authentication&user',
    routes: [
      {
        pathName: 'user',
        method: 'GET',
        params: null,
        encodedParams: '',
        info: 'Retreive your user information details.',
        title: 'User',
      },
      {
        pathName: 'login',
        method: 'POST',
        params: authParams,
        info:
          'Login to an existing account and retrieves an authentication token.',
        title: 'Login',
        encodedParams: `--data-urlencode 'email=example@email.com' \ --data-urlencode 'password=dwdwd'`,
      },
      {
        pathName: 'register',
        method: 'POST',
        params: authParams,
        info:
          'Create a new account to use and retrieves an authentication token.',
        title: 'Register',
        encodedParams: `--data-urlencode 'email=example@email.com' \ --data-urlencode 'password=dwdwd'`,
      },
    ],
  },
  {
    title: 'Report Actions',
    id: 'report_actions',
    routes: [
      {
        pathName: 'crawl',
        method: 'POST',
        params: crawlParams,
        info: 'Multi-page scan for a domain gather all issues.',
        title: 'Crawl',
        encodedParams: "--data-urlencode 'url=https://a11ywatch.com'",
      },
      {
        pathName: 'crawl-stream',
        method: 'POST',
        params: crawlParams,
        info: 'Multi page scan for issues using streams.',
        title: 'Crawl Stream',
        encodedParams: "--data-urlencode 'websiteUrl=https://a11ywatch.com'",
      },
      {
        pathName: 'scan-simple',
        method: 'POST',
        params: crawlParams,
        info: 'Scan a single page for issues.',
        title: 'Scan',
        encodedParams: "--data-urlencode 'url=https://a11ywatch.com'",
      },
    ],
  },

  {
    title: 'Images',
    id: 'images',
    routes: [
      {
        pathName: 'image-check',
        method: 'POST',
        params: {
          imageBase64: {
            type: 'string',
            desc: 'A Base64 image to classify',
            optional: false,
          },
        },
        encodedParams: `--data-urlencode 'imageBase64=${exampleBase64}'`,
        info: 'Try to determine an image using AI based on a base64 string.',
        title: 'Image Classify',
      },
    ],
  },
  {
    title: 'Website Management',
    id: 'website_management',
    routes: [
      {
        pathName: 'website',
        method: 'POST',
        params: websiteParamDefs,
        encodedParams: "--data-urlencode 'websiteUrl=https://a11ywatch.com'",
        info: 'Create a website to track and configure for crawling.',
        title: 'Add Website',
      },
      {
        pathName: 'website?domain=https://a11ywatch.com',
        method: 'GET',
        params: null,
        encodedParams: '',
        info: 'Retreive a web page information details.',
        title: 'Website',
      },
      {
        pathName: 'website',
        method: 'PUT',
        params: websiteParamDefs,
        encodedParams: "--data-urlencode 'websiteUrl=https://a11ywatch.com'",
        info: 'Update a website configuration.',
        title: 'Update Website',
      },
      {
        pathName: 'report?url=https://a11ywatch.com',
        method: 'GET',
        params: null,
        encodedParams: '',
        info: 'Get the last scan ran for a web page url.',
        title: 'Last Scan',
      },
      {
        pathName: 'analytics?url=https://a11ywatch.com',
        method: 'GET',
        params: '',
        encodedParams: '',
        info: 'Retreive analytics for a web page.',
        title: 'Analytics',
      },
    ],
  },
  {
    title: 'Iframe Website',
    id: 'iframe_website',
    routes: [
      {
        pathName: 'iframe?url=https://a11ywatch.com',
        method: 'GET',
        params: '',
        encodedParams: '',
        info: 'Reverse engineer a website to iframe.',
        title: 'Iframe',
      },
    ],
  },
  {
    title: 'List Results',
    id: 'list_results',
    routes: [
      {
        pathName: 'list/website?offset=0',
        method: 'GET',
        params: '',
        encodedParams: '',
        info:
          'Retreive a list of websites paginated. Request is limited to 5 websites at a time.',
        title: 'List Websites',
      },
      {
        pathName: 'list/issue?offset=0&domain=a11ywatch.com',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get issues for',
            optional: true,
          },
        },
        encodedParams: '',
        info:
          'Retreive a list of issues paginated. Request is limited to 5 pages with issues at a time.',
        title: 'List Issues',
      },
      {
        pathName: 'list/pages?offset=0',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get pages for',
            optional: true,
          },
        },
        encodedParams: '',
        info:
          'Retreive a list of pages paginated. Request is limited to 5 pages at a time.',
        title: 'List Pages',
      },
      {
        pathName: 'list/analytics?offset=0&domain=a11ywatch.com',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get analytics for',
            optional: true,
          },
          pageUrl: {
            type: 'string',
            desc: 'The exact page url to get analytics for',
            optional: true,
          },
        },
        encodedParams: '',
        info:
          'Retreive a list of analytics paginated. Request is limited to 5 pages with issues at a time.',
        title: 'List Analytics',
      },

      {
        pathName: 'list/pagespeed?offset=0&domain=a11ywatch.com',
        method: 'GET',
        params: {
          offset: {
            type: 'number',
            desc: 'The page offset to grab the next set',
            optional: true,
          },
          domain: {
            type: 'string',
            desc: 'The domain to get analytics for',
            optional: true,
          },
          pageUrl: {
            type: 'string',
            desc: 'The exact page url to get analytics for',
            optional: true,
          },
        },
        encodedParams: '',
        info:
          'Retreive a list of pagespeed results paginated. Request is limited to 5 pages with issues at a time.',
        title: 'List PageSpeed',
      },
    ],
  },
]
