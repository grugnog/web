import { HomeManager } from '@app/managers'

// TODO: instead of overwriding anchors set event listener to intercept click
export const bindItemClick = (item: any, iframeDOM: any, _?: any) => {
  const voidHref = 'javascript:void(0);'

  if (item.hasAttribute('href') && item.href !== voidHref) {
    const storedHref = item.href
    item.onclick = () => {
      HomeManager.link(iframeDOM, storedHref)
    }
    item.href = voidHref
  }
}
