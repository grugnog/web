import type { BlogPageProps } from '@app/types'

const BLOG_WEBFLOW_URL =
  process.env.BLOG_WEBFLOW_URL || 'https://a11ywatch-blog.webflow.io'

// determine if the path is from WP or webflow [TODO: revalidate and just use query]
const getUrl = (q: string) => {
  if (q === '/' || !q) {
    return BLOG_WEBFLOW_URL
  }

  const containsAuthors = q.startsWith('/authors/') || q.startsWith('authors/')
  const containsCategories =
    q.startsWith('/categories/') || q.startsWith('categories/')

  let baseFolder = ''
  let query = q

  if (!(containsAuthors || containsCategories)) {
    baseFolder = '/blog/'
    query = `${query.replace('blog/', '')}`
  }

  return `${BLOG_WEBFLOW_URL}${`${baseFolder}${
    query[0] === '/' ? query : `/${query}`
  }`}`
}

// get wordpress page and parse content by themes
export const getBlogPage = async (
  pathname: string,
  directUrl?: boolean
): Promise<BlogPageProps> => {
  const links: BlogPageProps['links'] = []
  const stylesheets: BlogPageProps['stylesheets'] = []
  const metas: BlogPageProps['metas'] = []
  const headScripts: BlogPageProps['headScripts'] = []
  const bodyScripts: BlogPageProps['bodyScripts'] = []
  let html = ''
  let title = ''

  try {
    const res = await fetch(directUrl ? pathname : getUrl(pathname))
    const { parseHtml } = await import('./parse-html')

    if (res && res?.ok) {
      const response = await res?.text()

      if (response) {
        const htmlRoot = await parseHtml(response)

        const titleElement = htmlRoot.querySelector('title')
        const blogLinks = htmlRoot.querySelectorAll(`link`)
        const metaTags = htmlRoot.querySelectorAll(`meta`)

        const cssSheets = htmlRoot.querySelectorAll('style')
        const headTag = htmlRoot.querySelector(`head`)
        const colophon = htmlRoot.getElementById('colophon')
        const authorPrefix = htmlRoot.querySelectorAll('.author-prefix')

        const comments = htmlRoot.getElementById('comments')
        const htmlTag = htmlRoot.querySelector(`html`)
        const bodyTag = htmlRoot.querySelector(`body`)
        const wfbadge = htmlRoot.querySelector(`.w-webflow-badge`)

        // remove web font
        const webfont = htmlRoot.querySelector(
          `script[src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"]`
        )

        if (webfont) {
          webfont.remove()
        }

        if (colophon) {
          colophon.remove()
        }
        if (comments) {
          comments.remove()
        }
        if (wfbadge) {
          wfbadge.remove()
        }

        authorPrefix?.forEach((tag) => {
          tag.remove()
        })

        // IMPORTANT: scripts that belong in the head
        const startScripts = htmlRoot.querySelectorAll(`head script`)

        // quickly remove top level head scripts
        startScripts?.forEach((tag) => {
          const { crossorigin, ...a } = tag.attributes

          if (tag && tag?.innerText.includes('WebFont.load({') === false) {
            if (crossorigin) {
              headScripts.push({
                crossOrigin: crossorigin,
                ...a,
                children: tag.innerText,
              })
            } else {
              headScripts.push({ ...tag.attributes, children: tag.innerText })
            }
          }

          tag.remove()
        })

        // all other scripts after - step required since no body target
        const endingScripts = htmlRoot.querySelectorAll(`script`)

        endingScripts?.forEach((tag) => {
          const { crossorigin, ...a } = tag.attributes

          if (tag && tag?.innerText.includes('WebFont.load({') === false) {
            if (crossorigin) {
              bodyScripts.push({
                crossOrigin: crossorigin,
                ...a,
                children: tag.innerText,
              })
            } else {
              bodyScripts.push({ ...tag.attributes, children: tag.innerText })
            }
          }

          tag.remove()
        })

        metaTags?.forEach((tag) => {
          const { crossorigin, ...a } = tag.attributes

          if (a && a?.name !== 'viewport') {
            if (crossorigin) {
              metas.push({ crossOrigin: crossorigin, ...a })
            } else {
              metas.push(a)
            }
          }

          tag.remove()
        })

        blogLinks.forEach((link) => {
          const atr = link.attributes
          const rel = atr && 'rel' in atr ? atr.rel : '' // relative links to CMS not website

          if (
            !['apple-touch-icon', 'icon', 'manifest', 'shortcut icon'].includes(
              rel
            )
          ) {
            links.push(link.attributes)
          }

          link.remove()
        })

        const h1Tags = htmlRoot.querySelectorAll(`h1`)

        h1Tags?.forEach((h1, index) => {
          if (index >= 1) {
            let clone = h1
            clone.tagName = 'h2'

            h1.replaceWith(clone)
          }
        })

        const h2Tags = htmlRoot.querySelectorAll(`h2`)

        h2Tags?.forEach((h2, index) => {
          if (index >= 1) {
            let clone = h2
            clone.tagName = 'h3'

            h2.replaceWith(clone)
          }
        })

        title = titleElement?.structuredText || ''

        htmlRoot.insertAdjacentHTML(
          'beforeend',
          `<style type="text/css">

          ${
            directUrl
              ? `
              body {
                width: auto;
              }

              body .light-background {
                width: 60em;
                margin: 1em auto;
                color: #222;
                font-family: "Ubuntu", sans-serif;
                padding-bottom: 4em;
              }
              
              p {
                padding-bottom: 3px;
                padding-top: 3px;
              }
              h3 {
                padding-top: 10px;
                padding-bottom: 5px;
                font-size: 1.3em;
                font-weight: 500;
              }

          `
              : ''
          }
              main h4, h5, h6 {
                font-weight: 600;
                font-family: system-ui;
              }
              .entry-date.published, .blog-date {
                color: rgba(117, 117, 117, 1);
              }
              main a {
                color: rgb(37, 99, 235);
                text-decoration: none;
                padding: 0.2em;
              }
          </style>
          `
        )

        cssSheets.forEach((sheet) => {
          sheet.removeWhitespace()

          stylesheets.push({
            ...sheet.attributes,
            children: sheet.innerText,
          })
          sheet.remove()
        })

        titleElement?.remove()
        htmlRoot.removeWhitespace()
        headTag?.remove()

        if (htmlTag && bodyTag) {
          bodyTag.tagName = 'div'
          htmlTag?.replaceWith(bodyTag)
        }

        html = htmlRoot.innerHTML
          .replace(`<!doctype html><html lang="en-US">`, '')
          .replace(`</html>`, '')
      }
    }
  } catch (e) {
    console.error(e)
  }

  return {
    name: '',
    html,
    title,
    links,
    stylesheets,
    metas,
    bodyScripts,
    headScripts,
  }
}
