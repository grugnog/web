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

  return (
    <InfoBlock title={'Custom CDN'} icon={<GrCloudSoftware />}>
      <div className='flex pb-2'>
        <span className='text-sm font-medium'>MINIFIED</span>
        <input
          checked={isMinified}
          type='checkbox'
          onChange={() => setMinified((minified: boolean) => !minified)}
          className={
            'outline-none relative inline-flex flex-shrink-0 h-5 w-10 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
        ></input>
      </div>
      <PrismLight
        language={'html'}
        style={prismStyles}
        onClick={copyClipboard}
        className={'hover:bg-blue-500 hover:text-white cursor-pointer'}
      >
        {isMinified ? cdnUrlMinifed : cdnUrl}
      </PrismLight>
      <div className='py-3 text-gray-500 text-sm'>
        <p>{cdnConnected ? 'Connected' : 'Disconnected'}</p>
      </div>
    </InfoBlock>
  )
}

export const CustomCDNBox = memo(CustomCDNBoxWrapper)
