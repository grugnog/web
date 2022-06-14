import React from 'react'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { OSSRoutes } from '@app/configs'
import { GetStaticProps } from 'next'
import { URL } from 'url'
import { GrStar } from 'react-icons/gr'

function OSSCell({ item }: { item: typeof OSSRoutes[number] }) {
  return (
    <a href={item.href} rel='noreferrer' target='_blank'>
      <div className={`border-2 rounded py-4 px-4 hover:shadow-xl`}>
        <div>
          <p className='text-xl font-bold'>{item.name}</p>
          <p className='text-lg text-gray-600'>{item.description}</p>
        </div>
        <div className='flex place-content-between place-items-center pt-3'>
          <div className='text-sm'>{item.fullName.toLowerCase()}</div>
          <div className='flex space-x-2 text-xm place-items-center '>
            {item.stars ?? 0}
            <GrStar className='grIcon w-3 h-3' />
          </div>
        </div>
      </div>
    </a>
  )
}

function OpenSource({
  name,
  items,
}: PageProps & {
  items: typeof OSSRoutes
}) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Open Source Software</PageTitle>
      <h2 className='py-4 text-blue-600 text-sm'>Ethos</h2>
      <p className='text-base pt-1 pb-4 text-gray-600'>
        Open source has a big role on the way we build our products here.
        <p>
          We give back to the community and provide some free and simple
          software.
        </p>
      </p>
      <ul className='py-4 gap-y-4 gap-x-4 grid grid-cols-2'>
        {items?.map((item) => (
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

const getItems = async (): Promise<typeof OSSRoutes> => {
  const items: typeof OSSRoutes = []

  for await (const oss of OSSRoutes) {
    let path

    try {
      path = new URL(oss.href)?.pathname
    } catch (e) {
      console.error(e)
    }

    let props
    let res
    try {
      res = await fetch(`http://api.github.com/repos${path}`, {
        headers: {
          Authorization: process.env.GITHUB_TOKEN || '',
        },
      })
    } catch (e) {
      console.error(e)
    }

    if (res && res?.ok) {
      try {
        props = await res?.json()
      } catch (e) {
        console.error(e)
      }
    }

    if (props) {
      items.push({
        name: props?.name,
        description: props?.description,
        href: props?.html_url,
        stars: props?.stargazers_count,
        fullName: props?.full_name,
      })
    }
  }

  return items
}

export const getStaticProps: GetStaticProps = async () => {
  const items = await getItems()

  return {
    props: {
      items: items?.length ? items : OSSRoutes,
    },
    revalidate: 3600 * 6, // every 6 hours
  }
}
