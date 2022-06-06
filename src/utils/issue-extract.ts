import { PageIssue } from '@app/types'

// return valid page issues from recursive issues gql type [Issues.issues] due to model name
export const issueExtractor = (website?: any): PageIssue[] => {
  const { issue, issues } = website ?? {}

  if (issue && Array.isArray(issue)) {
    return issue
  }

  if (issues && Array.isArray(issues)) {
    return issues
  }

  if (issues && !Array.isArray(issues) && 'issues' in issues) {
    return issues.issues as PageIssue[]
  }

  return []
}

// get issue [Deprecated]
export const getIssue = (website: any) => {
  let issue
  if (website?.issue) {
    issue = website.issue
  } else if (
    Array.isArray(website?.issues) &&
    website?.issues?.length &&
    website?.issues[0]?.issues
  ) {
    issue = website?.issues[0]?.issues
  } else {
    issue = website?.issues
  }
  return issue
}
