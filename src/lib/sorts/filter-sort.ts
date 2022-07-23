// filter website by domain
export const filterSort = (datasource?: any[], params?: any) => {
  if (datasource && Array.isArray(datasource)) {
    return datasource?.filter(({ domain }) => String(domain)?.includes(params))
  }
  return []
}
