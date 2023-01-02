import React from 'react'
import { createPortal } from 'react-dom'
import { AnnotationContainer } from '@app/components/ada'
import { IframeManager } from '@app/managers'
import { getAccessibleColors } from './get-colors'
import { bindItemClick } from './ada/bind'
import { getFontContrastErrors } from './get-font-contrast-errors'

// TODO: DEPRECATE THIS FILE
export const highlightErrors = (iframeDOM: Document, url: string) => {
  const a11yElements = iframeDOM?.querySelectorAll(
    'button, input, select, textarea'
  )

  const linksElements = iframeDOM?.querySelectorAll('a')

  if (linksElements?.length) {
    linksElements.forEach((item: any) => {
      bindItemClick(item, iframeDOM, url)
    })
  }

  if (a11yElements?.length) {
    a11yElements.forEach((item: any) => {
      const elementParent = item?.parentNode

      const parentBackgroundColor = getComputedStyle(
        elementParent,
        null
      ).getPropertyValue('background-color')

      const elementColor = getComputedStyle(item, null).getPropertyValue(
        'color'
      )
      const elementFontSize = getComputedStyle(item, null).getPropertyValue(
        'font-size'
      )

      if (parentBackgroundColor && elementColor) {
        const { contrastRatio } = getAccessibleColors({
          parentBackgroundColor,
          elementColor,
        })

        const {
          // errorAALarge,
          // errorAASmall,
          // warningAALarge,
          // warningAASmall,
          contrastFontError,
        } = getFontContrastErrors({ elementFontSize, contrastRatio })

        try {
          if (contrastFontError) {
            const newElement = iframeDOM.createElement('div')

            elementParent?.insertBefore(newElement, item.nextSibling)
            IframeManager.setAdaElements({
              source: item,
              parent: elementParent,
            })

            IframeManager.setPortals(
              createPortal(
                React.createElement(AnnotationContainer, {
                  contrastRatio: contrastRatio.toFixed(2),
                  source: item,
                  elementParent: elementParent,
                  portalID: IframeManager.portals.length,
                  errorType: item.errorType,
                  ...item,
                  // errorType: {
                  //   errorAALarge,
                  //   errorAASmall,
                  //   warningAALarge,
                  //   warningAASmall,
                  //   smallFont: parseInt(elementFontSize, 10) < 8,
                  //   major: contrastRatio === Infinity,
                  // },
                }),
                newElement
              )
            )
          }
        } catch (e) {
          console.error('highlight errors issue', e)
        }
      }
    })
  }
}
