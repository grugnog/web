export const filterSort = (datasource: any[] = [], params: any) =>
  datasource?.filter(({ domain }) => String(domain)?.includes(params))
