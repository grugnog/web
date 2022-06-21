import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { userModel, initAppModel } from '@app/data'
import { DOMAIN_NAME, twitterSite } from '@app/configs'
import { strings } from '@app/content/strings/a11y'
import { theme } from '@app/theme'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    if (ctx.req) {
      userModel.initModel({
        cookie: ctx.req.headers?.cookie,
      })
      initAppModel()
    }

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheets.collect(<App {...props} />),
      })

    const { styles, ...initialProps } = await Document.getInitialProps(ctx)

    return Object.assign({}, initialProps, {
      styles: (
        <>
          {styles}
          {sheets.getStyleElement()}
        </>
      ),
    })
  }

  render() {
    return (
      <Html lang='en'>
        <Head>
          {process.env.NEXT_PUBLIC_DISABLE_SEO === '1' ? (
            <meta name='robots' content='noindex' />
          ) : null}
          <meta
            name='theme-color'
            content={theme.palette.primary.main}
            key={'theme-color'}
          />
          <meta name='mobile-web-app-capable' content='yes' />
          <link rel='manifest' href='/manifest.json' key={'manifest'} />
          <meta
            name='format-detection'
            content='telephone=no'
            key={'format-detection'}
          />
          <meta
            name='apple-mobile-web-app-capable'
            content='yes'
            key={'apple-mobile-web-app-capable'}
          />
          <meta
            name='twitter:card'
            content='summary_large_image'
            key={'twitter:card'}
          />
          <meta
            name='twitter:site'
            content={twitterSite}
            key={'twitter:site'}
          />
          <meta
            property='twitter:image'
            content={`${DOMAIN_NAME}/img/intro-poster.png`}
          />
          <meta
            property='og:title'
            key={'og:title'}
            content={`Web Accessibility Service | ${strings.appName}`}
          />
          <meta property='og:url' content={DOMAIN_NAME} key={'og:url'} />
          <meta
            property='og:image'
            key={'og:image'}
            content={`${DOMAIN_NAME}/img/intro-poster.png`}
          />
          <link
            rel='apple-touch-icon'
            href='/img/apple-touch-icon.png'
            key={'apple-touch-icon'}
          />
          <link
            rel='icon'
            type='image/x-icon'
            href='/img/favicon.ico'
            key={'image/x-icon'}
          />
        </Head>
        <Main />
        <NextScript />
      </Html>
    )
  }
}

export default MyDocument
