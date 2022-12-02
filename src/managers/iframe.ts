import { styleInject, highlightErrors, createAnnotations } from '@app/lib'
import { observable, action, computed } from 'mobx'
import { AppManager } from './app'
import { frameDom } from './frame-dom'

class IframeManager {
  @observable
  selectedAnnotation = null

  @observable
  viewMode = false

  scriptFix = observable<any>([])
  fixIframe = observable<any>([])
  portals = observable<any>([])

  dom: any = {}
  adaElements: any[] = []
  issueInited: boolean = false

  initManager = (dom: any, sourceUrl: string) => {
    highlightErrors(dom, sourceUrl)
    styleInject(dom)
  }

  @action clearPortals = () => {
    this.portals.clear()
    this.fixIframe.clear()
    this.scriptFix.clear()
    this.adaElements = []
    this.issueInited = false
  }

  @action
  setPortals = (portals: any) => {
    if (portals) {
      this.portals.push(portals)
    }
  }

  @action
  setAdaElements = (element: any) => {
    if (element) {
      this.adaElements.push(element)
    }
  }

  @action
  removePortal = (index: number) => {
    this.adaElements.splice(index, 1)
    if (this.portals[index]) {
      this.portals[index] = null
    } else {
      // todo: portal left open on old window
    }
  }

  @action addScriptFix = (fix: any) => {
    this.scriptFix.push(fix)
  }

  @action
  addFixFrame = (fix: any) => {
    this.fixIframe.push(fix)
  }

  @action
  toggleView = () => {
    this.viewMode = !this.viewMode
  }

  @action clearIssues = () => {
    this.issueInited = false
  }

  autoFix = () => {
    if (this.fixIframe && this.fixIframe.length) {
      this.fixIframe.forEach((memMethod: () => void, i: number) => {
        if (typeof memMethod === 'function') {
          memMethod()
          this.removePortal(i)
        }
      })
      AppManager.toggleSnack(true, 'Auto Fix Applied', 'message')
    }
  }

  @action setActiveAnnotation = (data: any) => {
    this.selectedAnnotation = data
  }

  @computed get activeAnnotation() {
    return !!this.selectedAnnotation
  }

  @computed get Portals() {
    return this.portals
  }

  @computed get issuesWithFix() {
    return this.adaElements.map(({ source, parent }: any, index: number) => {
      const { id, href, name } = source

      // TODO GEt issue type
      return {
        id: index,
        issue: 'Issue type',
        element: {
          class: source.class,
          id,
          href,
          name,
        },
        parent: {
          class: parent.class,
          id: parent.id,
          href: parent.href,
          name: parent.name,
        },
      }
    })
  }

  @action initIssueFix = (data: any, url?: string) => {
    // get issues as array
    const issues =
      data && Array.isArray(data) ? data : data?.issues || data?.issue

    if (issues?.length && frameDom?.dom) {
      const issueMap = issues.filter((item: any) => {
        let selector = 'querySelector'
        let query = item?.selector ? item.selector.trim() : ''

        if (query[0] === '#' && query.includes(' ') === false) {
          selector = 'getElementById'
        }

        if (item?.selector && frameDom?.dom[selector]) {
          try {
            const element = frameDom?.dom[selector](item?.selector)

            if (element) {
              item.element = element
              return item
            }
          } catch (e) {
            console.error(e)
          }
        }
      })

      issueMap.length && createAnnotations(issueMap, url || data?.pageUrl)

      this.issueInited = true
    }
  }
}

const manager = new IframeManager()

export { manager as IframeManager }
