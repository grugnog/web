import React from 'react'
import Image from 'next/image'
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
  { src: 'marketing_blockchain', alt: 'BlockChain.com logo' },
  { src: 'marketing_arrow', alt: 'Arrow Electronics logo' },
]

export function MarketingTrustBy() {
  return (
    <SectionContainer>
      <div className='text-center pb-3 text-lg text-gray-700 font-bold'>
        Trusted by many businesses from all over
      </div>
      <div className='border rounded'>
        <div className='grid grid-cols-2 gap-0.5 md:grid-cols-3'>
          {images.map(({ src, alt, ext }: ImageProps, i: number) => (
            <MarketingImage src={src} ext={ext} alt={alt} key={`${i}_${ext}`} />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
