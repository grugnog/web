import React from 'react'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { OSSRoutes } from '@app/configs'

function OSSCell({ item }: { item: typeof OSSRoutes[number] }) {
  return (
    <a href={item.href} rel='noreferrer' target='_blank'>
      <div className={`border-2 rounded py-4 px-4 hover:bg-gray-100`}>
        <div>
          <p className='text-xl font-bold'>{item.name}</p>
          <p className='text-lg text-gray-600'>{item.description}</p>
        </div>
      </div>
    </a>
  )
}

function OpenSource({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Open Source Software</PageTitle>
      <p className='text-base pt-1 pb-4 text-gray-600'>
        Open source has a big role on the way we build our products here.
        <p>
          We give back to the community and provide some free and simple
          software.
        </p>
      </p>
      <ul className='py-4 gap-y-4 gap-x-4 grid grid-cols-2'>
        {OSSRoutes.map((item) => (
          <li key={item.name}>
            <OSSCell item={item} />
          </li>
        ))}
      </ul>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { OpenSource },
  {
    description: `A list of Open-Source projects we contribute to.`,
  }
)
