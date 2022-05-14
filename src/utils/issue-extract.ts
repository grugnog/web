import { Issue } from '@app/types'

// return valid page issues from recursive issues gql type [Issues.issues] due to model name
export const issueExtractor = (issue: Issue): Issue[] => {
  if (issue && Array.isArray(issue)) {
    return issue as Issue[]
  }
  if (issue && 'issues' in issue && Array.isArray(issue.issues)) {
    return issue.issues as Issue[]
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
