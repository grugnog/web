import React, { memo, useMemo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrCloudSoftware } from 'react-icons/gr'
import { copyClipboard } from '@app/lib'
import { PrismLight } from 'react-syntax-highlighter'
import { Script } from '@app/types'
import { SCRIPTS_CDN_URL_HOST } from '@app/configs'
import { classNames } from '@app/utils/classes'

const notAvail = 'Not available on a Free plan.'

export const CustomCDNBoxWrapper = ({
  cdnConnected,
  script,
  domain,
  activeSubscription,
}: {
  cdnConnected?: boolean
  cdnUrlMinifed?: string
  cdnUrl?: string
  script?: Script
  domain: string
  activeSubscription?: boolean
}) => {
  const [isMinified, setMinified] = useState<boolean>(true)

  const { cdnBaseMin, cdnBase } = useMemo(() => {
    if (!activeSubscription) {
      return {
        cdnBase: 'Paid Plan Required',
        cdnBaseMin: 'Paid Plan Required',
      }
    }
    const cdnBase =
      script?.cdnUrl ?? `${domain}/${domain.replace(/\./g, '-')}-ada-fix-0.js`
    const cdnBaseMin =
      script?.cdnUrlMinified ??
      `${domain}/${domain.replace(/\./g, '-')}-ada-fix-0.min.js`

    const cdnUrl = cdnBase ? `${SCRIPTS_CDN_URL_HOST}/${cdnBase}` : notAvail
    const cdnUrlMinifed = cdnBaseMin
      ? `${SCRIPTS_CDN_URL_HOST}/${cdnBaseMin}`
      : notAvail

    return {
      cdnBase: cdnUrl,
      cdnBaseMin: cdnUrlMinifed,
    }
  }, [script, activeSubscription, domain])

  const cdnText = isMinified ? cdnBaseMin : cdnBase

  const disabled = cdnText === '[Paid plan required]'

  return (
    <InfoBlock
      title={'CDN'}
      icon={
        <GrCloudSoftware
          className={classNames('grIcon', cdnConnected ? 'text-green-600' : '')}
        />
      }
    >
      <>
        <div className='flex space-x-1 place-items-center'>
          <span className='text-sm font-medium'>Minified</span>
          <input
            checked={isMinified}
            type='checkbox'
            onChange={() => setMinified((minified: boolean) => !minified)}
            className={
              ' outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }
            disabled={disabled}
          ></input>
        </div>
        {!disabled ? (
          <PrismLight
            language={'html'}
            onClick={copyClipboard}
            customStyle={{ background: undefined }}
            className={'hover:text-blue-500 cursor-pointer'}
          >
            {cdnText}
          </PrismLight>
        ) : (
          <pre className={' cursor-pointer'}>{cdnText}</pre>
        )}
      </>
    </InfoBlock>
  )
}

export const CustomCDNBox = memo(CustomCDNBoxWrapper)
