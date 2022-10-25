import React from 'react'
import Image from 'next/image'
import { SectionContainer } from '../general'

interface ImageProps {
  src: string
  alt: string
  ext?: 'svg' | 'png' | 'webp' | 'gif'
  key?: string // react key
}

function MarketingImage({ src, alt, ext = 'svg' }: ImageProps) {
  return (
    <div className='invert flex justify-center py-8 px-8 grayscale'>
      <Image
        width={231.68}
        height={56.45}
        className='max-h-12'
        src={`/img/${src}.${ext}`}
        alt={alt}
      />
    </div>
  )
}
const images: ImageProps[] = [
  { src: 'marketing_hulu', alt: 'Hulu logo', key: 'hulu' },
  {
    src: 'marketing_blockchain',
    alt: 'BlockChain.com logo',
    key: 'blockchain',
  },
  { src: 'marketing_arrow', alt: 'Arrow Electronics logo', key: 'arrow' },
]

export function MarketingTrustBy() {
  return (
    <SectionContainer>
      <div className='text-center pb-3 text-lg text-gray-700 font-bold'>
        Trusted by many from all over
      </div>
      <div>
        <div className='grid grid-cols-3'>
          {images.map(({ src, alt, ext, key }: ImageProps) => (
            <MarketingImage src={src} ext={ext} alt={alt} key={key} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
