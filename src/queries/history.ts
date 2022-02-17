/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import gql from 'graphql-tag'

const GET_HISTORY = gql`
  query getHistory($filter: String) {
    user {
      id
      history {
        id
        url
        domain
        cdnConnected
        html
        htmlIncluded
        insight {
          json
        }
        pageLoadTime {
          duration
          durationFormated
          color
        }
        subDomains {
          domain
          url
          adaScore
          insight {
            json
          }
          pageLoadTime {
            duration
            durationFormated
            color
          }
          issues(filter: $filter) {
            pageUrl
          }
        }
        issues(filter: $filter) {
          pageUrl
          issues {
            code
            type
            selector
            message
            context
          }
        }
      }
    }
  }
`

export { GET_HISTORY }
