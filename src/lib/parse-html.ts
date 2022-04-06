const BLOG_URL = process.env.BLOG_URL || 'https://a11ywatch.wpcomstaging.com'

// cleanup wordpress page and parse html
export const parseHtml = async (body: string) => {
  const { parse } = await import('node-html-parser')

  const htmlRoot = parse(body)

  const siteNavigationAnchor = htmlRoot.querySelector('#site-navigation a')
  const adminBar = htmlRoot.querySelector('#wpadminbar')
  const blogAnchors = htmlRoot.querySelectorAll(`a[href^="${BLOG_URL}"]`)
  const footer = htmlRoot.querySelector('.footer-wrap')
  const navMenu = htmlRoot.querySelector('.menu-area')
  const statsScript = htmlRoot.querySelector(
    `script[src^="https://stats.wp.com"]`
  )
  const blurScript = htmlRoot.querySelector(
    `script[src^="https://s0.wp.com/wp-content/js/bilmur.min.js"]`
  )
  const h1Tags = htmlRoot.querySelectorAll(`h1`)
  const likesIframe = htmlRoot.querySelector(`#likes-master`)

  const shareSection = htmlRoot.querySelectorAll(`.sharedaddy`)
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
  likesIframe?.remove()

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

  adminBar?.remove()
  footer?.remove()
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

  htmlRoot.removeWhitespace()

  return htmlRoot
}