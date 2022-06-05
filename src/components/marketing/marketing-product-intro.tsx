import React from 'react'
import Image from 'next/image'

export function MarketingProductIntro() {
  return (
    <section id='app-section' className='overflow-visible pb-20'>
      <div>
        <h3 className='sr-only'>
          Multiple tools for web accessibility improvement
        </h3>
        <div className={'flex flex-nowrap relative md:left-0 left-20'}>
          <div className='flex-1 rounded border relative -left-40 overflow-hidden'>
            <Image
              height={250}
              width={350}
              src={'/img/marketing_playground.jpg'}
              alt={'Accessibility live test playground example with figma.com'}
              layout={'responsive'}
            />
          </div>
          <div className='flex-1 rounded border relative right-32 overflow-hidden'>
            <Image
              height={250}
              width={350}
              src={'/img/marketing_dashboard.jpg'}
              alt={
                'Dashboard for accessibility insights with example using figma.com'
              }
              layout={'responsive'}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
