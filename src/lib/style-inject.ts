import { iframeStyles } from './iframe-styles'

export const styleInject = (iframeDOM?: Document) => {
  if (iframeDOM) {
    let headElement =
      iframeDOM?.getElementsByTagName && iframeDOM.getElementsByTagName('head')
    let head = headElement?.length
      ? headElement[0]
      : iframeDOM?.createElement('head')

    if (process.env.NODE_ENV !== 'production' && iframeDOM?.createElement) {
      let link = iframeDOM.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('type', 'text/css')
      link.setAttribute(
        'href',
        `${window.location.origin}/_next/css/styles.chunk.css`
      )
      if (head?.appendChild) {
        head.appendChild(link)
      }
    } else if (iframeDOM?.createElement) {
      let style = iframeDOM.createElement('style')
      if (style) {
        style.innerHTML = iframeStyles
      }
      if (head?.appendChild) {
        head?.appendChild(style)
      }
    }
  }
}
