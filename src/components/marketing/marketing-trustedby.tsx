import React from 'react'
import Image from 'next/image'

export function MarketingTrustBy() {
  const width = '231.68px'
  const height = '56.45px'

  return (
    <section
      style={{
        paddingTop: '12%',
        paddingBottom: '12%',
      }}
    >
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8'>
        <h3 className='text-center text-base font-semibold uppercase text-white tracking-wider'>
          Trusted by many businesses from all over
        </h3>
        <style>
          {`
            .grayScale {
            filter: gray;
            -webkit-filter: grayscale(1); 
            filter: grayscale(1); 
            }
            .grayScale:hover {
            -webkit-filter: grayscale(0);
            filter: none;
            }
            `}
        </style>
        <div className='mt-6 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-8'>
          <div className='col-span-1 flex justify-center py-8 px-8 bg-gray-50'>
            <Image
              className='max-h-12 grayScale'
              src='/static/img/marketing_blockchain.svg'
              alt='BlockChain.com logo'
              width={width}
              height={height}
            />
          </div>
          <div className='col-span-1 flex justify-center py-8 px-8 bg-gray-50'>
            <Image
              width={width}
              height={height}
              className='max-h-12 grayScale'
              src='/static/img/marketing_supermajority.svg'
              alt='SuperMajority Logo'
            />
          </div>
          <div className='col-span-1 flex justify-center py-8 px-8 bg-gray-50'>
            <Image
              width={width}
              height={height}
              className='max-h-12 grayScale'
              src='/static/img/marketing_matchmanao.svg'
              alt='Matchmanao Logo'
            />
          </div>
          <div className='col-span-1 flex justify-center py-8 px-8 bg-gray-50'>
            <Image
              width={width}
              height={height}
              className='max-h-12 grayScale'
              src='/static/img/marketing_chinquapin.png'
              alt='Chinquapin Lake Taho Resort Logo'
            />
          </div>
          <div className='col-span-1 flex justify-center py-8 px-8 bg-gray-50'>
            <Image
              className='max-h-12 grayScale'
              src='/static/img/marketing_escape.svg'
              alt='Escapada Rural Logo'
              width={width}
              height={height}
            />
          </div>
          <div className='col-span-1 flex justify-center py-8 px-8 bg-gray-50'>
            <Image
              className='max-h-12 grayScale'
              src='/static/img/marketing_vivacom.svg'
              alt='Vivacom Logo'
              width={width}
              height={height}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
