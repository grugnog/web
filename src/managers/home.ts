import { observable, action, computed } from 'mobx'
import Router from 'next/router'
import { IframeManager } from './iframe'
import { AppManager } from './app'

class HomeManager {
  @observable
  searchHidden: boolean = false

  @observable
  iframeSrc: string = ''

  @observable
  url: string = ''

  preventDefault(event?: any) {
    event?.preventDefault()
  }

  getIframeSource = (url: string = ''): string => {
    const src = this.iframeSrc || `/api/iframe?url=${encodeURI(url)}`

    return src
  }

  @computed get getTestFrameUrl() {
    return this.iframeSrc || 'https://www.drake.com'
  }

  @action
  submit = (event: any, url: string) => {
    this.preventDefault(event)
    IframeManager.clearPortals()
    AppManager.clearPortals()
    this.iframeSrc = `/api/iframe?url=${url || this.url}`
    this.searchHidden = true
  }

  @action
  link = (iframeDOM: any, source: any) => {
    if (iframeDOM) {
      Router.push({
        pathname: window?.location?.pathname,
        query: { websiteUrl: source },
      })
      IframeManager.clearPortals()
      // TODO: update iframeDOm location and just update urlParam source
      iframeDOM.location = `/api/iframe?url=${source}`
    }
  }

  @action
  displaySearch = (event?: any) => {
    this.preventDefault(event)
    if (this.searchHidden) {
      this.searchHidden = false
    }
  }

  @action
  hideSearch = (event: any) => {
    this.preventDefault(event)
    if (!this.searchHidden) {
      this.searchHidden = true
    }
  }

  @action
  onChange = (event: any) => {
    this.preventDefault(event)
    this.url = event.target.value
  }

  @action
  clearSearch = (event: any) => {
    this.preventDefault(event)
    this.url = ''
    this.displaySearch()
  }
}

const manager = new HomeManager()

export { manager as HomeManager }
