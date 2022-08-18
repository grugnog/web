import gql from 'graphql-tag'

const GET_WEBSITE = gql`
  query getWebsite($url: String) {
    website(url: $url) {
      _id
      url
      userId
      domain
      cdnConnected
      timestamp
      online
      pageInsights
      mobile
      tld
      subdomains
      insight {
        json
      }
      script {
        _id
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
        adaScore
        adaScoreAverage
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

export { GET_WEBSITE }
