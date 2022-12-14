import { Header3 } from '@app/components/general/header'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { SectionContainer } from '../containers/section-container'

const codeString = `import { scan, multiPageScan } from "@a11ywatch/a11ywatch";

// single page website scan.
const results = await scan({ url: "https://a11ywatch.com" });
console.log(results);
// multi page website scan.
const resultsAll = await multiPageScan({ url: "https://a11ywatch.com", subdomains: false, tld: false });
console.log(resultsAll);
`

export const JavascriptUsage = () => {
  return (
    <SectionContainer>
      <div className='place-content-center place-items-center flex flex-col'>
        <Header3>Javascript Integration</Header3>
        <p className='pb-2'>
          Use npm or your favorite javascript package manager to install the
          suite.
        </p>
        <div className='flex flex-col bg-[#0e1116] max-w-[96vw] rounded px-4 py-3'>
          <SyntaxHighlighter
            language='javascript'
            style={a11yDark}
            customStyle={{ backgroundColor: '#0e1116' }}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      </div>
    </SectionContainer>
  )
}
