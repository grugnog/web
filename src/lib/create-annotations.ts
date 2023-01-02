import { createElement } from 'react'
import { createPortal } from 'react-dom'
import { AnnotationContainer } from '@app/components/ada'
import { IframeManager, frameDom } from '@app/managers'
import { bindItemClick } from './ada/bind'

export const createAnnotations = (issueMap: any, url: string) => {
  try {
    const dom = frameDom?.dom
    const linksElements = dom.querySelectorAll('a')

    if (linksElements?.length) {
      linksElements.forEach((item: any) => {
        bindItemClick(item, dom, url)
      })
    }

    if (issueMap?.length) {
      issueMap.forEach((item: any) => {
        const el = item?.element

        if (el) {
          try {
            const elementParent = el?.parentNode
            const newElement = dom.createElement('div')
            elementParent?.insertBefore(newElement, el?.nextSibling)
            IframeManager.setAdaElements({
              source: el,
              parent: elementParent,
            })
            const annotationProps = {
              source: el,
              elementParent: elementParent,
              portalID: IframeManager.portals.length,
              errorType: item?.type,
              context: item?.context,
              message: item?.message,
              code: item?.code,
              recurrence: item?.recurrence,
            }

            IframeManager.setPortals(
              createPortal(
                createElement(AnnotationContainer, annotationProps),
                newElement
              )
            )
          } catch (e) {
            console.error(
              `error: ${e}, element: ${item?.element?.parentNode?.name}`
            )
          }
        }
      })
    }
  } catch (e) {
    console.error(e)
  }
}
