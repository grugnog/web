import { observable, action } from 'mobx'

const defaultSnackBar = {
  title: '',
  type: 'message',
  open: false,
}

class AppManager {
  @observable
  overlay = false

  @observable
  snackbar = defaultSnackBar

  // @observable
  // portals: string[] = []
  readonly portals = observable<any>([])

  dismissAnnotation = () => {}

  @action
  toggleOverlay = (method: any, open: boolean) => {
    if (this.overlay) {
      this.dismissAnnotation()
    }
    this.dismissAnnotation = method
    this.overlay = typeof open !== 'undefined' ? open : !this.overlay
  }

  @action clearPortals = () => {
    this.portals.clear()
  }

  @action
  setPortals = (portals: any) => {
    this.portals.push(portals)
  }

  @action
  removePortal = (index: number) => {
    // todo pop it off array
    const dIndex = this.portals.indexOf(index)
    if (dIndex > -1) {
      this.portals.splice(dIndex, 1)
    }
    // this.portals[index] = null
  }

  @action resetSnackbar = () => {
    this.snackbar = { ...defaultSnackBar }
  }

  @action closeSnack = () => {
    this.snackbar.open = false
  }

  @action
  toggleSnack = (open: boolean, title: any, type: string = 'message'): void => {
    const snackTitle = Array.isArray(title)
      ? title.length
        ? title[0].message
        : 'Error'
      : title

    this.snackbar = {
      title: snackTitle,
      type,
      open,
    }
  }
}

const manager = new AppManager()

export { manager as AppManager }
