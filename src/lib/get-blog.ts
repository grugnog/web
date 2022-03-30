import type { BlogPageProps } from '@app/types'

const BLOG_URL = process.env.BLOG_URL || 'https://a11ywatch.wpcomstaging.com'

// get wordpress page and parse content by themes
export const getBlogPage = async (pathname: string): Promise<BlogPageProps> => {
  const links: BlogPageProps['links'] = []
  const stylesheets: BlogPageProps['stylesheets'] = []
  const metas: BlogPageProps['metas'] = []
  const headScripts: BlogPageProps['headScripts'] = []
  const bodyScripts: BlogPageProps['bodyScripts'] = []
  let html = ''
  let title = ''

  try {
    const res = await fetch(`${BLOG_URL}${pathname ? `/${pathname}` : ''}`)
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

        // IMPORTANT: scripts that belong in the head
        const startScripts = htmlRoot.querySelectorAll(`head script`)

        // quickly remove top level head scripts
        startScripts?.forEach((tag) => {
          headScripts.push({ ...tag.attributes, children: tag.innerText })
          tag.remove()
        })

        // all other scripts after - step required since no body target
        const endingScripts = htmlRoot.querySelectorAll(`script`)

        endingScripts?.forEach((tag) => {
          bodyScripts.push({ ...tag.attributes, children: tag.innerText })
          tag.remove()
        })

        metaTags?.forEach((tag) => {
          metas.push(tag.attributes)
          tag.remove()
        })

        blogLinks.forEach((link) => {
          links.push(link.attributes)
          link.remove()
        })

        title = titleElement?.structuredText || ''

        htmlRoot.insertAdjacentHTML(
          'beforeend',
          `<style type="text/css">
            h1.post-title {
              font-size: 36px;
              font-weight: 800;
            }
            article > .entry-wrapper > p {
              max-width: none;
            }
            h2 {
              font-size: 26px;
              font-weight: 600;
            }
            #content, #comments {
              padding-top: 20px;
              padding-bottom: 20px;
              overflow: hidden;
            }
            .light-background {
              background-color: #fff;
              font-family: system-ui;
            }
            .dark-background {
              background-color: rgb(26, 26, 26);
              font-family: system-ui;
            }
        </style>`
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

        html = htmlRoot.innerHTML.replace(
          `<!doctype html><html lang="en-US">`,
          ''
        )
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
