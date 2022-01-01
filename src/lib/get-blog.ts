/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const getBlogPage = async (
  websiteUrl: string
): Promise<{
  html?: string
  title: string
  links: string[]
  stylesheets: string[]
  metas: string[]
}> => {
  const BLOG_URL = process.env.BLOG_URL || 'https://a11ywatch.wpcomstaging.com'
  let html = ''
  let title = ''
  let links: any[] = []
  let stylesheets: any[] = []
  let metas: any[] = []

  try {
    const res = await fetch(`${BLOG_URL}${websiteUrl ? `/${websiteUrl}` : ''}`)
    const { parse } = await import('node-html-parser')

    if (res && res?.ok) {
      const response = await res?.text()

      if (response) {
        const htmlRoot = parse(response)

        const siteNavigationAnchor = htmlRoot.querySelector(
          '#site-navigation a'
        )

        const adminBar = htmlRoot.querySelector('#wpadminbar')
        const blogAnchors = htmlRoot.querySelectorAll(`a[href^="${BLOG_URL}"]`)
        const blogLinks = htmlRoot.querySelectorAll(`link`)
        const footer = htmlRoot.querySelector('.footer-wrap')
        const navMenu = htmlRoot.querySelector('.menu-area')
        const statsScript = htmlRoot.querySelector(
          `script[src^="https://stats.wp.com"]`
        )

        // const externalScripts = htmlRoot.querySelectorAll(`script[src]`)

        const metaTags = htmlRoot.querySelectorAll(`meta`)
        const shareSection = htmlRoot.querySelectorAll(`.sharedaddy`)

        // const links = htmlRoot.querySelectorAll(`links`)

        adminBar?.remove()
        footer?.remove()
        statsScript?.remove()

        blogAnchors.forEach((link) => {
          const url = link.getAttribute('href') || ''

          url &&
            link.setAttribute(
              'href',
              url.replace(
                BLOG_URL,
                process.env.NODE_ENV === 'development' ? '/blog' : ''
              )
            )
        })

        // externalScripts?.forEach((tag) => {
        //   tag.remove()
        // })

        shareSection?.forEach((tag) => {
          tag.remove()
        })

        metaTags?.forEach((tag) => {
          metas.push(tag.attributes)
          tag.remove()
        })

        const titleElement = htmlRoot.querySelector('title')

        title = titleElement?.structuredText || ''

        titleElement?.remove()
        siteNavigationAnchor?.remove()
        navMenu?.remove()

        blogLinks.forEach((link) => {
          links.push({ ...link.attributes })
          link.remove()
        })

        htmlRoot.insertAdjacentHTML(
          'beforeend',
          `<style type="text/css">

        #content, #comments {
          padding-top: 20px;
          padding-bottom: 20px;
          overflow: hidden;
         }

        .light-background {
          background-color: #fff;
        }
        .dark-background {
          background-color: rgb(26, 26, 26);
        }
        </style>`
        )

        const cssSheets = htmlRoot.querySelectorAll('style')

        cssSheets.forEach((sheet) => {
          stylesheets.push({
            ...sheet.attributes,
            children: sheet.innerText,
          })
          sheet.remove()
        })

        htmlRoot.removeWhitespace()

        // TODO: use theme variable classname
        html = `<div class="light-background">
          ${htmlRoot.toString()}</div>`
      }
    }
  } catch (e) {
    console.error(e)
  }

  return { html, title, links, stylesheets, metas }
}
