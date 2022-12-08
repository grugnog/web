export const restWebsiteDefaults = {
  loading: false,
  data: {} as any,
  search: '', // search query
  html: '', // raw html
  setSearch: (_: any): void => {
    return _
  },
  setHtml: (_: any): void => {
    return _
  },
  scanPage: (_q: any): Promise<any> => {
    return Promise.resolve()
  },
  toggleModal: (_: string, __?: boolean): Promise<void> => {
    return Promise.resolve()
  },
  closeModal: (): void => {},
}
