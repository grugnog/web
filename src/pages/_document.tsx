/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import { Children } from 'react'
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import { userModel, initAppModel } from '@app/data'
import { AppRegistry } from 'react-native'
import appConfig from '../../app.json'

const normalizeNextElements = `
  body > div:first-child,
  #__next {
    height: 100%;
  }
  input, textarea {
    outline: none;
  }
`

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    AppRegistry.registerComponent(appConfig.name, () => Main)

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
    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication(appConfig.name, {
      initialProps,
    })

    const stylesSheet = (
      <>
        <style
          key={0}
          dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
        />
        {Children.toArray(getStyleElement())}
        {styles}
        {sheets.getStyleElement()}
      </>
    )

    return Object.assign({}, initialProps, {
      styles: stylesSheet,
    })
  }

  render() {
    return (
      <Html lang='en'>
        <Head />
        <Main />
        <NextScript />
      </Html>
    )
  }
}

export default MyDocument
