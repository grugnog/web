import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
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
