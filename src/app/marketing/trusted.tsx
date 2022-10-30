import React from 'react'
import { SectionContainer } from '../containers/section-container'
import { HuluSvg } from '../svgs/brand-hulu'
import { BlockChainSvg } from '../svgs/brand-blockchain'
import { ArrowSvg } from '../svgs/brand-arrow'
import { Header4 } from '@app/components/general/header'

const props = {
  width: 231.68,
  height: 56.45,
  className: 'max-h-12',
}

export function MarketingTrustBy() {
  return (
    <SectionContainer>
      <Header4 className='text-center max-w-none'>
        Trusted by many from all over
      </Header4>
      <div>
        <div className='grid grid-cols-3'>
          <div className='invert flex justify-center py-8 px-8 grayscale'>
            <HuluSvg {...props} />
          </div>
          <div className='invert flex justify-center py-8 px-8 grayscale'>
            <BlockChainSvg {...props} />
          </div>
          <div className='invert flex justify-center py-8 px-8 grayscale'>
            <ArrowSvg {...props} />
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}
