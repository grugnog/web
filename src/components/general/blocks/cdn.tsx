import React, { memo } from 'react'
import { ScriptDownloadButton } from '@app/components/general'
import { PrismLight } from 'react-syntax-highlighter'
import { a11yDark } from '@app/styles'

interface CdnProps {
  cdn_url?: string
  cdn_url_min?: string
  hideUrl?: boolean
  hideMin?: boolean
}

export function CdnBlockComponent({
  cdn_url,
  cdn_url_min,
  hideUrl,
  hideMin,
}: CdnProps) {
  return (
    <div className={`flex place-items-center space-x-2 overflow-hidden`}>
      <div className={`flex-1 max-w-[94%]`}>
        {!hideUrl && cdn_url ? (
          <>
            {hideMin ? (
              <div className={'border py-1 px-2 font-bold'}>
                <p className='text-xm'>Source</p>
              </div>
            ) : null}
            <PrismLight language='html' style={a11yDark}>
              {`<script src="${cdn_url}"></script>`}
            </PrismLight>
          </>
        ) : null}
        {!hideMin && cdn_url_min ? (
          <>
            <div className={'border py-1 px-2 font-bold'}>
              <p className='text-xm'>Minified</p>
            </div>
            <PrismLight
              language='html'
              style={a11yDark}
              className={`max-h-[50vh] mb-0`}
            >
              {`<script src="${cdn_url_min}" crossorigin="anonymous"></script>`}
            </PrismLight>
          </>
        ) : null}
      </div>
      <ScriptDownloadButton cdn_url={cdn_url} cdn_url_min={cdn_url_min} />
    </div>
  )
}

export const CdnBlock = memo(CdnBlockComponent)
