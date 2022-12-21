import { observable, action, computed } from 'mobx'
import Router from 'next/router'
import { IframeManager } from './iframe'
import { AppManager } from './app'
import { create, persist } from 'mobx-persist'

class HomeManager {
  @observable
  searchHidden: boolean = false

  @observable
  iframeSrc: string = ''

  @observable
  url: string = ''

  @persist @observable refClosed = false

  @persist @observable selectedWebsite = ''

  constructor() {
    this.hydrate()
  }

  @action
  hydrate = async () => {
    if (typeof window === 'undefined') {
      return
    }

    const pour = create({
      storage: window?.localStorage,
      jsonify: true,
    })

    try {
      await pour('home', this)
    } catch (e) {
      console.error(e)
    }
  }

  preventDefault(event?: any) {
    event?.preventDefault()
  }

  getIframeSource = (url: string = ''): string => {
    return this.iframeSrc || `/api/iframe?url=${encodeURIComponent(url)}`
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
  link = async (iframeDOM: any, source: any) => {
    if (iframeDOM) {
      try {
        await Router.push({
          pathname: window?.location?.pathname,
          query: { url: source },
        })
      } catch (e) {
        console.error(e)
      }
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

  @action
  toggleRef = () => {
    this.refClosed = !this.refClosed
  }

  @action
  setDashboardView = (selectedWebsite: string) => {
    this.selectedWebsite = selectedWebsite
  }
}

const manager = new HomeManager()

export { manager as HomeManager }
