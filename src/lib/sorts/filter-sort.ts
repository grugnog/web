export const filterSort = (datasource?: any[], params?: any) => {
  if (datasource) {
    return datasource?.filter(({ domain }) => String(domain)?.includes(params))
  }
  return []
}
