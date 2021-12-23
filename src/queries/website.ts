/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_WEBSITE = gql`
  query getWebsite($url: String) {
    website(url: $url) {
      url
      id
      userId
      domain
      adaScore
      cdnConnected
      htmlIncluded
      screenshot
      timestamp
      script {
        id
        script
        cdnUrl
        cdnUrlMinified
      }
      pageLoadTime {
        duration
        durationFormated
        color
      }
      pageHeaders {
        key
        value
      }
      issuesInfo {
        issuesFixedByCdn
        possibleIssuesFixedByCdn
        totalIssues
      }
      issues {
        pageUrl
      }
    }
  }
`

const GET_WEBSITE_HTML = gql`
  query getWebsite($url: String) {
    website(url: $url) {
      id
      url
      html
      htmlIncluded
    }
  }
`

export { GET_WEBSITE_HTML, GET_WEBSITE }
