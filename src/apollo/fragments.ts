import gql from 'graphql-tag'

export const issueFragments = gql`
  fragment IssueParts on Issue {
    pageUrl
    _id
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
    _id
    domain
    url
    pageInsights
    insight {
      json
    }
    online
    pageLoadTime {
      duration
      durationFormated
      color
    }
    issuesInfo {
      adaScore
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
      adaScore
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

export const analyticsFragments = gql`
  fragment AnalyticParts on Analytic {
    _id
    domain
    pageUrl
    adaScore
    possibleIssuesFixedByCdn
    totalIssues
    issuesFixedByCdn
    errorCount
    warningCount
    noticeCount
  }
`
