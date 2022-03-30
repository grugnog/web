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
    const { parse } = await import('node-html-parser')

    const res = await fetch(`${BLOG_URL}${pathname ? `/${pathname}` : ''}`)

    if (res && res?.ok) {
      const response = await res?.text()

      if (response) {
        const htmlRoot = parse(response)

        const siteNavigationAnchor = htmlRoot.querySelector(
          '#site-navigation a'
        )
        const titleElement = htmlRoot.querySelector('title')
        const adminBar = htmlRoot.querySelector('#wpadminbar')
        const blogAnchors = htmlRoot.querySelectorAll(`a[href^="${BLOG_URL}"]`)
        const blogLinks = htmlRoot.querySelectorAll(`link`)
        const footer = htmlRoot.querySelector('.footer-wrap')
        const navMenu = htmlRoot.querySelector('.menu-area')
        const statsScript = htmlRoot.querySelector(
          `script[src^="https://stats.wp.com"]`
        )
        const blurScript = htmlRoot.querySelector(
          `script[src^="https://s0.wp.com/wp-content/js/bilmur.min.js"]`
        )
        const h1Tags = htmlRoot.querySelectorAll(`h1`)

        const metaTags = htmlRoot.querySelectorAll(`meta`)
        const shareSection = htmlRoot.querySelectorAll(`.sharedaddy`)
        const cssSheets = htmlRoot.querySelectorAll('style')
        const followHeading = htmlRoot.querySelector('#follow-our-blog')

        if (followHeading) {
          const followHeadingSubtitle = followHeading?.nextElementSibling
          // remove jetpack custom follow sections trail
          followHeadingSubtitle?.nextElementSibling?.remove()
          followHeadingSubtitle?.remove()
          followHeading?.remove()
        }

        // wordpress theme scripts - disable for app analytics & bluring
        statsScript?.remove()
        blurScript?.remove()

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

        h1Tags?.forEach((h1, index) => {
          if (h1Tags.length > 1) {
            // replace the navbar h1 to span
            if (index === 0) {
              let clone = h1
              clone.tagName = 'span'
              h1.replaceWith(clone)
              // let the second H1 stick (issue with wp theme)
            } else if (index > 1) {
              let clone = h1
              clone.tagName = 'h2'

              h1.replaceWith(clone)
            }
          }
        })

        // manipulate links that are blog pages relativeness
        blogAnchors.forEach((link) => {
          const url = link.getAttribute('href') || ''
          if (url) {
            link.setAttribute(
              'href',
              url.replace(
                BLOG_URL,
                process.env.NODE_ENV === 'development' ? '/blog' : ''
              )
            )
          }
        })

        shareSection?.forEach((tag) => {
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

        adminBar?.remove()
        footer?.remove()
        titleElement?.remove()
        siteNavigationAnchor?.remove()
        navMenu?.remove()

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
        html = htmlRoot.innerHTML
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
