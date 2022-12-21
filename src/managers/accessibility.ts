import { observable, action, toJS } from 'mobx'
import { IframeManager } from './iframe'

class AccessibilityManager {
  @observable
  scriptFixOpen: boolean = false

  @observable
  scriptFix: any[] = []

  @action toggleScriptFix = () => {
    if (!this.scriptFixOpen) {
      const dataFix = toJS(IframeManager.scriptFix).map((fix: any) => {
        const { className } = fix.autoFixSource
        const getFixStyle = fix.autoFixType.replace(
          /([A-Z])/g,
          (matches: any) => `-${matches[0].toLowerCase()}`
        )
        const colorToHex = fix.item.hex()
        let classNameSplit = className.split(' ')
        classNameSplit = classNameSplit ? `.${classNameSplit}` : ''

        fix.css = `
        ${String(classNameSplit).replace(',', ' .')} {
          ${getFixStyle}: ${colorToHex}
        }`

        fix.className = String(classNameSplit).replace(',', ' .')
        fix.getFixStyle = getFixStyle
        fix.color = colorToHex
        return fix
      })

      this.scriptFix = dataFix
    } else {
      this.scriptFix = []
    }
    this.scriptFixOpen = !this.scriptFixOpen
  }
}

const manager = new AccessibilityManager()

export { manager as AccessibilityManager }
