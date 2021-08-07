import React, { memo } from 'react'
import Image from 'next/image'
import { Typography } from '@material-ui/core'
import { SectionHeading } from '../text'

interface ImageProps {
  src: string
  alt: string
}

function TrustBy() {
  const width = '231.68px'
  const height = '56.45px'

  function MarketingImage({ src, alt }: ImageProps) {
    return (
      <div className='col-span-1 flex justify-center py-8 px-8'>
        <Image
          width={width}
          height={height}
          className='max-h-12 filter grayscale hover:grayscale-0'
          src={`/static/img/${src}.svg`}
          alt={alt}
        />
      </div>
    )
  }

  const images = [
    { src: 'marketing_blockchain', alt: 'BlockChain.com logo' },
    { src: 'marketing_supermajority', alt: 'SuperMajority logo' },
    { src: 'marketing_matchmanao', alt: 'Matchmanao logo' },
    { src: 'marketing_arrow', alt: 'Arrow Electronics logo' },
    { src: 'marketing_escape', alt: 'Escapada Rural logo' },
    { src: 'marketing_vivacom', alt: 'Vivacom logo' },
  ]

  return (
    <section
      style={{
        paddingTop: '12%',
        paddingBottom: '12%',
      }}
    >
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
        <div>
          <SectionHeading>
            Trusted by many businesses from all over
          </SectionHeading>
          <Typography variant='h6' component='p' gutterBottom>
            From small companies to Fortune 500
          </Typography>
        </div>
        <div className='mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8'>
          {images.map(({ src, alt }: ImageProps, i: number) => {
            return <MarketingImage src={src} alt={alt} key={`${i}_${src}`} />
          })}
        </div>
      </div>
    </section>
  )
}

export const MarketingTrustBy = memo(TrustBy)
