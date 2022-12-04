import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { initAppModel, userModel } from '@app/data'

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
    // load initial faq props on html
    const faq = this.props.__NEXT_DATA__.page === '/faq'

    return (
      <Html
        lang='en'
        itemScope={faq || undefined}
        itemType={faq ? 'https://schema.org/FAQPage' : undefined}
      >
        <Head />
        <Main />
        <NextScript />
      </Html>
    )
  }
}

export default MyDocument
