import gql from 'graphql-tag'
import { UserManager, AppManager } from '@app/managers'
import { MutationUpdaterFn } from 'apollo-client'
import { issueFragments, websiteFragments } from '@app/apollo'
import { User } from '@app/types'

const GET_WEBSITES = gql`
  ${issueFragments}
  ${websiteFragments}
  query getWebsites($filter: String, $limit: Int, $offset: Int) {
    user {
      id
      websites(limit: $limit, offset: $offset) {
        ...WebsiteParts
        issues(filter: $filter) {
          ...IssueParts
        }
      }
    }
  }
`

export const GET_ISSUES = gql`
  ${issueFragments}
  query getWebsites($filter: String, $limit: Int, $offset: Int) {
    user {
      id
      websites(limit: $limit, offset: $offset) {
        ... on Website {
          _id
          url
          domain
          cdnConnected
          issuesInfo {
            totalIssues
          }
        }
        issues(filter: $filter) {
          ...IssueParts
        }
      }
    }
  }
`

export const updateCache: {
  update?: MutationUpdaterFn<any>
  last: any // last website stored in cache
  lastVariables: any
} = {
  last: [],
  lastVariables: {},
  update(cache, { data }) {
    // initial vars
    const variables = {
      userId: UserManager.getID,
      filter: '',
      limit: 2,
      offset: 0,
    }

    // TODO: pass in filter
    const query = cache.readQuery<{ user: User }>({
      query: GET_WEBSITES,
      variables,
    })

    if (query && 'user' in query) {
      const user = query?.user
      const { websites } = user ?? { websites: [] }

      let newWebSites = updateCache.last.length ? updateCache.last : websites

      const { addWebsite, removeWebsite } = data

      if (addWebsite || removeWebsite) {
        if (addWebsite) {
          if (addWebsite?.website) {
            newWebSites = newWebSites.concat(addWebsite.website)
          }
        } else if (removeWebsite) {
          const site = removeWebsite.website
          if (removeWebsite.success) {
            if (site) {
              newWebSites = websites?.filter(
                (data: any) => data.url !== site.url
              )
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
              subDomains: item.subDomains ?? [],
              issues: item.issues ?? [],
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
        updateCache.lastVariables = variables
      }
    }
  },
}

export { GET_WEBSITES }
