import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { FakeButtonContainer } from '../fake'
import { SectionContainer } from '../general'

const codeString = `import { scan, multiPageScan } from "@a11ywatch/a11ywatch";

// single page website scan.
const data = await scan({ url: "https://a11ywatch.com" });
console.log(data)
// multi page website scan.
const dataMultiPage = await multiPageScan({ url: "https://a11ywatch.com", subdomains: false, tld: false });
console.log(dataMultiPage)
`

export const CtaJavascript = () => {
  return (
    <SectionContainer>
      <div className='place-content-center place-items-center flex flex-col'>
        <h3 className='font-bold text-3xl'>Javascript Integration</h3>
        <h4 className='pb-2 text-xl'>
          Use npm or your favorite javascript package manager to install the
          suite.
        </h4>
        <div className='flex flex-col border-4 border-[#2A2A2A] max-w-[96vw] rounded px-4 py-3'>
          <div className='flex flex-wrap gap-x-5 gap-y-4 place-items-center'>
            <div className='flex-1 rounded sm:w-1/3 shadow-xl'>
              <FakeButtonContainer title='Bash' />
              <div className='border-b' />
              <div className='bg-white'>
                <div className='py-3 px-3 text-lg'>
                  <div className='text-gray-600'>
                    <span className='text-gray-500'>~ </span> npm i
                    @a11ywatch/a11ywatch --save
                  </div>
                </div>
              </div>
            </div>
            <SyntaxHighlighter language='javascript' style={docco}>
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
