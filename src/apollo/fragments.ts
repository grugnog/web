import gql from 'graphql-tag'

// exact page issue fragment
export const pageIssuesFragments = gql`
  fragment PageIssuesParts on PageIssue {
    code
    type
    selector
    message
    context
    recurrence
  }
`

export const issueFragments = gql`
  ${pageIssuesFragments}
  fragment IssueParts on Issue {
    _id
    pageUrl
    issues {
      ...PageIssuesParts
    }
  }
`

export const scriptsFragments = gql`
  fragment ScriptParts on Script {
    _id
    pageUrl
    domain
    script
    cdnUrl
    cdnUrlMinified
    cdnConnected
    issueMeta {
      skipContentIncluded
    }
    scriptMeta {
      skipContentEnabled
    }
  }
`

export const subdomainFragments = gql`
  fragment PagesParts on Pages {
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
    cdnConnected
    lastScanDate
    online
    pageInsights
    mobile
    standard
    verified
    insight {
      json
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
    crawlDuration
    ua
    actionsEnabled
    robots
    subdomains
    tld
    shutdown
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
