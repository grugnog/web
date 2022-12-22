// determine what queries a page can run initially via the route path
export const buildScopeQuery = (nameLowerCased: string, query: boolean) => {
  let scopedQuery = ''
  let initialQuery = query

  // run query without pages
  if (nameLowerCased === 'web issues') {
    initialQuery = false
    scopedQuery = 'issues'
  }
  if (nameLowerCased === 'web pages') {
    initialQuery = false
    scopedQuery = 'pages'
  }
  if (nameLowerCased === 'web actions') {
    initialQuery = false
    scopedQuery = 'actions'
  }
  if (nameLowerCased === 'analytics') {
    initialQuery = false
    scopedQuery = 'analytics'
  }
  if (nameLowerCased === 'scripts') {
    initialQuery = false
    scopedQuery = 'scripts'
  }

  return {
    initialQuery,
    scopedQuery,
  }
}
