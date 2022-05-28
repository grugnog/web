import gql from 'graphql-tag'

export const issueFragments = gql`
  fragment IssueParts on Issue {
    pageUrl
    issues {
      code
      type
      selector
      message
      context
      recurrence
    }
  }
`

export const subdomainFragments = gql`
  fragment SubdomainParts on SubDomain {
    domain
    url
    adaScore
    pageInsights
    insight {
      json
    }
    pageLoadTime {
      duration
      durationFormated
      color
    }
    issuesInfo {
      adaScoreAverage
      possibleIssuesFixedByCdn
      totalIssues
      issuesFixedByCdn
      errorCount
      warningCount
      noticeCount
    }
  }
`

export const websiteFragments = gql`
  fragment WebsiteParts on Website {
    _id
    url
    domain
    adaScore
    adaScoreAverage
    cdnConnected
    lastScanDate
    online
    pageInsights
    mobile
    standard
    ua
    insight {
      json
    }
    script {
      id
      script
      cdnUrl
      cdnUrlMinified
    }
    issuesInfo {
      adaScoreAverage
      possibleIssuesFixedByCdn
      totalIssues
      issuesFixedByCdn
      errorCount
      warningCount
      noticeCount
      pageCount
    }
    pageHeaders {
      key
      value
    }
    pageLoadTime {
      duration
      durationFormated
      color
    }
  }
`
