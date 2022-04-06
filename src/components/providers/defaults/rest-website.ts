import { SyntheticEvent } from 'react'

export const restWebsiteDefaults = {
  loading: false,
  data: {} as any,
  search: '', // search query
  setSearch: (_: any): void => {
    return _
  },
  scanPage: (
    _: null | SyntheticEvent<HTMLInputElement>,
    _q: any
  ): Promise<any> => {
    return Promise.resolve()
  },
  toggleModal: (_: any): Promise<any> => {
    return _
  },
  closeModal: (): void => {},
}