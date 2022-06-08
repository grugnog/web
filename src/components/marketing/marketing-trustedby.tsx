import React, { memo } from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core'
import { SectionHeading } from '../text'
import { SectionContainer } from '../general'

interface ImageProps {
  src: string
  alt: string
  ext?: 'svg' | 'png' | 'webp' | 'gif'
}

function MarketingImage({ src, alt, ext = 'svg' }: ImageProps) {
  return (
    <div className='invert col-span-1 flex justify-center py-8 px-8 grayscale hover:grayscale-0 hover:invert-0 hover:bg-[#0E1116]'>
      <Image
        width={'231.68px'}
        height={'56.45px'}
        className='max-h-12'
        src={`/img/${src}.${ext}`}
        alt={alt}
      />
    </div>
  )
}
const images: ImageProps[] = [
  { src: 'marketing_hulu', alt: 'Hulu logo' },
  { src: 'marketing_supermajority', alt: 'SuperMajority logo' },
  { src: 'marketing_arrow', alt: 'Arrow Electronics logo' },
  { src: 'marketing_blockchain', alt: 'BlockChain.com logo' },
  { src: 'marketing_microsoft', alt: 'Microsoft logo' },
  { src: 'marketing_escape', alt: 'Escapada Rural logo' },
]

function TrustBy() {
  return (
    <SectionContainer className={'bg-gray-100'}>
      <SectionHeading>Trusted by many businesses from all over</SectionHeading>
      <Typography variant='h6' component='p' gutterBottom>
        Used by small companies to Fortune 500.
      </Typography>
      <div className='px-4 sm:px-6 lg:px-8 border'>
        <div className='grid grid-cols-2 gap-0.5 md:grid-cols-3'>
          {images.map(({ src, alt, ext }: ImageProps, i: number) => (
            <MarketingImage src={src} ext={ext} alt={alt} key={`${i}_${ext}`} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export const MarketingTrustBy = memo(TrustBy)
