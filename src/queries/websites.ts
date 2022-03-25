import gql from 'graphql-tag'
import { UserManager, AppManager } from '@app/managers'
import { MutationUpdaterFn } from 'apollo-client'

const issuesFrag = `
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
`
const GET_WEBSITES = gql`
  query getWebsites($filter: String) {
    user {
      id
      websites {
        url
        domain
        adaScore
        cdnConnected
        html
        htmlIncluded
        lastScanDate
        online
        pageInsights
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
          issuesFixedByCdn
          possibleIssuesFixedByCdn
          totalIssues
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
        subDomains {
          domain
          url
          adaScore
          htmlIncluded
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
            issuesFixedByCdn
            possibleIssuesFixedByCdn
            totalIssues
          }
          issues(filter: $filter) {
            pageUrl
          }
        }
        ${issuesFrag}
      }
    }
  }
`

export const GET_ISSUES = gql`
  query getWebsites($filter: String) {
    user {
      id
      websites {
        url
        domain
        cdnConnected
        issuesInfo {
          totalIssues
        }
        ${issuesFrag}
      }
    }
  }
`

export const updateCache: { update?: MutationUpdaterFn<any>; last: any } = {
  last: [],
  update(cache: any, { data: { addWebsite, removeWebsite } }: any) {
    const variables = { userId: UserManager.getID, filter: '' }

    const { user } = cache.readQuery({
      query: GET_WEBSITES,
      variables,
    })

    const { websites } = user

    let newWebSites = updateCache.last ?? []

    if (addWebsite || removeWebsite) {
      if (addWebsite) {
        newWebSites = newWebSites.concat([addWebsite?.website])
      }
      if (removeWebsite) {
        const site = removeWebsite.website
        if (removeWebsite.success) {
          if (site) {
            newWebSites = websites.filter((data: any) => data.url !== site.url)
          } else {
            newWebSites = []
            AppManager.toggleSnack(true, removeWebsite.message, 'success')
          }
        }
      }

      const pages = newWebSites
        .reduce((acc: any, current: any) => {
          const x = acc.find((item: any) => item.url === current.url)
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])
        .map((item: any) => {
          return {
            ...item,
          }
        })

      cache.writeQuery({
        query: GET_WEBSITES,
        variables,
        data: {
          user: {
            ...user,
            websites: pages,
          },
        },
      })

      updateCache.last = newWebSites
    }
  },
}

export { GET_WEBSITES }
