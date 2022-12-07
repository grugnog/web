import React, { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrCloudSoftware } from 'react-icons/gr'
import { prismStyles } from '@app/styles'
import { copyClipboard } from '@app/lib'
import { PrismLight } from 'react-syntax-highlighter'

export const CustomCDNBoxWrapper = ({
  cdnUrlMinifed,
  cdnUrl,
  cdnConnected,
}: {
  cdnConnected?: boolean
  cdnUrlMinifed?: string
  cdnUrl?: string
}) => {
  const [isMinified, setMinified] = useState<boolean>(true)

  const cdnText = isMinified ? cdnUrlMinifed : cdnUrl

  return (
    <InfoBlock title={'CDN'} icon={<GrCloudSoftware />}>
      <>
        <div className='flex space-x-1'>
          <span className='text-sm pb-2 font-medium'>Minified</span>
          <input
            checked={isMinified}
            type='checkbox'
            onChange={() => setMinified((minified: boolean) => !minified)}
            className={
              'text-gray-700 outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }
          ></input>
        </div>
        {/*  @ts-ignore */}
        <PrismLight
          language={'html'}
          style={prismStyles}
          onClick={
            cdnText === '[Paid plan required]' ? () => {} : copyClipboard
          }
          className={'hover:bg-blue-500 hover:text-white cursor-pointer'}
        >
          {cdnText}
        </PrismLight>
        <div
          className={`py-2 text-sm ${
            !cdnConnected ? 'text-gray-700' : 'text-green-600'
          }`}
        >
          {cdnConnected ? 'Connected' : 'Disconnected'}
        </div>
      </>
    </InfoBlock>
  )
}

export const CustomCDNBox = memo(CustomCDNBoxWrapper)
