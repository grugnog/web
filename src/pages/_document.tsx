import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'

export default function Document({ __NEXT_DATA__ }: DocumentProps) {
  const faq = __NEXT_DATA__.page === '/faq'

  return (
    <Html
      lang='en'
      itemScope={faq || undefined}
      itemType={faq ? 'https://schema.org/FAQPage' : undefined}
    >
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
