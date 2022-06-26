import { Website } from '@app/types'
import { domainName } from './domain'

/*
 *  Get the feed item related to the website.
 *  @param feed the feed list
 *  @param feedKeys the keys of the feed
 *  @param website the website printIntrospectionSchema
 *  return item associated with feed and website
 */
export const getFeedItem = (
  feed: Record<string, any>,
  feedKeys: string[],
  { domain, tld, subdomains }: Website
) => {
  const feedItem =
    feed && domain in feed
      ? feed[domain]
      : {
          [domain]: {},
        }

  const captureAll = tld || subdomains

  if (captureAll) {
    for (const key of feedKeys) {
      if (domainName(key) === domainName(domain)) {
        for (const item in feed[key]) {
          feedItem[item] = feed[key][item]
        }
      }
    }
  }

  let items = []

  if (feedItem) {
    items = Object.keys(feedItem)
      ?.map((ke: any) => {
        if (Object.keys(feedItem[ke]).length) {
          return feedItem[ke]
        }
        return false
      })
      .filter(Boolean)
  }
  return items
}
