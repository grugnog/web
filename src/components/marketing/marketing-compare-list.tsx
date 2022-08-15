import { memo } from 'react'

import { GrFormCheckmark, GrFormClose } from 'react-icons/gr'

type TableRowProps = {
  rows: string[]
}

const TableHeading = ({ title }: { title: string }) => {
  return (
    <thead className='border-b bg-gray-800 text-left'>
      <tr>
        <th scope='col' className='text-sm font-medium text-white py-4 px-6'>
          {title}
        </th>
        <th scope='col' className='text-sm font-medium text-white py-4 px-6'>
          A11yWatch
        </th>
        <th scope='col' className='text-sm font-medium text-white py-4 px-6'>
          Pa11y
        </th>
        <th scope='col' className='text-sm font-medium text-white py-4 px-6'>
          Axe
        </th>
      </tr>
    </thead>
  )
}

const TableRow = ({ rows }: TableRowProps) => {
  return (
    <tr className='border-b bg-gray-50'>
      {rows.map((row: string, i: number) => {
        return (
          <>
            <td
              className={`px-6 py-2.5 whitespace-nowrap text-base text-gray-700 ${
                i === 0 ? 'font-medium' : 'font-light'
              }`}
            >
              {row === 'true' || row === 'maybe' ? (
                <GrFormCheckmark
                  className={`grIcon text-2xl ${
                    row === 'maybe' ? 'text-yellow-500' : 'text-green-500'
                  }`}
                  aria-label={`feature included${
                    row === 'maybe' ? ' partially' : ''
                  }`}
                />
              ) : row === 'false' ? (
                <GrFormClose
                  className='grIcon text-red-500 text-2xl'
                  aria-label={'feature excluded'}
                />
              ) : (
                row
              )}
            </td>
          </>
        )
      })}
    </tr>
  )
}

// list features
function FeatureWrapper() {
  return (
    <>
      <div className='py-2'>
        <h3 className='py-2 border-t border-b font-bold text-lg'>
          Accessibility Features
        </h3>
      </div>

      <div className='overflow-auto border rounded'>
        <table className='min-w-full table-auto'>
          <TableHeading title={'Feature'} />
          <tbody>
            <TableRow
              rows={['Live web accessibility testing', 'true', 'true', 'true']}
            />
            <TableRow
              rows={[
                'WCAG A-AAA testing and recommendations',
                'true',
                'true',
                'true',
              ]}
            />
            <TableRow rows={['CI pipelines', 'true', 'true', 'true']} />
            <TableRow
              rows={['Command Line Interface', 'true', 'true', 'true']}
            />
            <TableRow rows={['Monitoring', 'true', 'true', 'true']} />
            <TableRow rows={['Cross site testing', 'true', 'maybe', 'maybe']} />
            <TableRow
              rows={['Custom actions to run on pages', 'true', 'true', 'false']}
            />
            <TableRow
              rows={[
                'Custom request headers configuration',
                'true',
                'true',
                'false',
              ]}
            />
            <TableRow
              rows={['Dynamic url handling', 'true', 'false', 'false']}
            />
            <TableRow
              rows={['Dynamic subdomains testing', 'true', 'false', 'false']}
            />
            <TableRow
              rows={['Dynamic TLD testing', 'true', 'false', 'false']}
            />
            <TableRow
              rows={['Parallel website testing', 'true', 'false', 'false']}
            />
            <TableRow
              rows={[
                'Handle large workloads and websites',
                'true',
                'false',
                'false',
              ]}
            />
            <TableRow
              rows={['Alt tag recommendations', 'true', 'false', 'false']}
            />
            <TableRow
              rows={[
                'Web accessibility code fixes directly',
                'true',
                'false',
                'false',
              ]}
            />
            <TableRow
              rows={['Custom smart safeguard CDN', 'true', 'false', 'false']}
            />
            <TableRow
              rows={['Custom editable scripts', 'true', 'false', 'false']}
            />
            <TableRow
              rows={[
                'Lighthouse reports across pages',
                'true',
                'false',
                'false',
              ]}
            />
          </tbody>
        </table>
      </div>

      <div className='py-6'>
        <div className='py-2 border-t border-b'>
          <h3 className='font-bold text-lg'>Accessibility Performance</h3>
          <p>All benches are done on 8gb linux Github Action containers</p>
        </div>
      </div>

      <div className='overflow-auto border rounded'>
        <table className='min-w-full table-auto'>
          <TableHeading title={'Performance'} />
          <tbody>
            <TableRow
              rows={[
                'https://www.coinbase.com - 5,900 pages',
                '13 mins',
                '48 hours+',
                '60 hours+',
              ]}
            />
            <TableRow
              rows={[
                'https://www.hbo.com - 7,500 pages',
                '18 mins',
                '55 hours+',
                '72 hours+',
              ]}
            />
            <TableRow
              rows={[
                'https://a11ywatch.com - 28 pages',
                '2.1s',
                '1 min',
                '2 mins',
              ]}
            />
          </tbody>
        </table>

        <div className='py-4 px-6'>
          <h4 className='text-lg font-bold'>Reasons why A11yWatch is faster</h4>

          <p>
            Some of the reasons A11yWatch and Pa11y run faster than Axe is due
            to the protocol of choice to control the browser. A11yWatch and
            Pa11y use the devtools protocol while Axe uses WebDriver. Devtools
            protocol allows you to manipulate the entire control beyond the UI
            layer to enhance the way a it would normally load a web page by
            doing things like intercepting network request, manipulating
            elements, and more. A11yWatch goes to the next level with
            optimisations for speed by leveraging multiple technologies like
            Rust, protocols like gRPC and efficient algorithms.
          </p>
        </div>
      </div>

      <div className='py-6'>
        <h3 className='py-2 border-t border-b font-bold text-lg'>
          Accessibility Coverage
        </h3>
      </div>

      <div className='overflow-auto border rounded'>
        <table className='min-w-full table-auto'>
          <TableHeading title={'Coverage'} />
          <tbody>
            <TableRow
              rows={[
                'WCAG',
                '50%-71% extends Pa11y',
                '40%-57% uses Axe or HTML_CodeSniffer',
                '57%',
              ]}
            />
          </tbody>
        </table>
      </div>
    </>
  )
}

export const FeatureMemo = memo(FeatureWrapper)

export const FeatureContainer = (props: any) => {
  return <FeatureMemo {...props} />
}

export const MarketingFeatureCompareList = memo(FeatureContainer)