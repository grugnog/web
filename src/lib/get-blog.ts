/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

export const getBlogPage = async (
  websiteUrl: string
): Promise<{ html?: string; title: string }> => {
  const BLOG_URL = process.env.BLOG_URL || 'https://a11ywatch.wpcomstaging.com'
  let html = ''
  let title = ''

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

        siteNavigationAnchor?.remove()

        const blogLinks = htmlRoot.querySelectorAll(`a[href^="${BLOG_URL}"]`)

        blogLinks.forEach((link) => {
          const url = link.getAttribute('href') || ''

          url && link.setAttribute('href', url.replace(BLOG_URL, '/blog'))
        })

        html = htmlRoot.toString()
        title = htmlRoot.querySelector('title')?.innerText || ''
      }
    }
  } catch (e) {
    console.error(e)
  }

  return { html, title }
}
