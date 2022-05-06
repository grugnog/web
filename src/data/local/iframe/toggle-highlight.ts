import { frameDom, AppManager } from '@app/managers'

let toggledOn = false

export const toggleHighLight = () => {
  toggledOn = !toggledOn
  const a11yElements = frameDom?.dom?.querySelectorAll('[data-a11y]') as any

  if (a11yElements.length) {
    a11yElements.forEach((element: any) => {
      if (toggledOn) {
        if (element.style) {
          element.style.outline = `4px solid ${
            element.getAttribute('data-a11y') === 'error'
              ? 'rgba(211, 47, 47, 0.76)'
              : 'rgba(255, 235, 59, 0.76)'
          }`
        }

        AppManager.toggleSnack(
          true,
          `Highlighted ${a11yElements.length} element${
            a11yElements.length === 1 ? '' : ''
          } fixed by CDN`,
          'sucess'
        )
      } else {
        if (element.style) {
          element.style.outline = null
        }
      }
    })
  }
}
