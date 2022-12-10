export type ModalParams = { query?: any; standard?: string; html?: string }

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
  toggleModal: (_: ModalParams, __?: boolean): Promise<void> => {
    return Promise.resolve()
  },
  closeModal: (): void => {},
}
