import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName, OSSRoutes } from '@app/configs'
import { GetStaticProps } from 'next'
import { URL } from 'url'
import { GrStar } from 'react-icons/gr'
import { SectionContainer } from '@app/app/containers/section-container'
import { Header, Header3 } from '@app/components/general/header'

function OSSCell({ item }: { item: typeof OSSRoutes[number] }) {
  return (
    <a
      href={item.href}
      rel='noreferrer'
      target='_blank'
      style={{
        padding: 0,
        margin: 0,
      }}
    >
      <div
        className={`border-2 rounded py-4 px-4 w-full h-full hover:shadow-xl`}
      >
        <div>
          <Header3 className='text-xl font-bold'>{item.name}</Header3>
          <p className='text-lg text-gray-600'>{item.description}</p>
        </div>
        <div className='flex place-content-between place-items-center pt-3'>
          <div className='text-sm'>{item.fullName.toLowerCase()}</div>
          <div className='flex space-x-2 text-xs place-items-center '>
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
      <SectionContainer container block>
        <Header>Open Source Software</Header>
        <h2 className='py-4 text-blue-600 text-sm'>Ethos</h2>
        <p className='text-base pt-1 pb-4 text-gray-600'>
          Open source has a big role on the way we build our products here.
          <p>
            We give back to the community and provide some free and simple
            software.
          </p>
        </p>
        <ul className='py-2 gap-x-2 gap-y-2 grid grid-cols-1 sm:grid-cols-2'>
          {items?.map((item) => (
            <li key={item.name}>
              <OSSCell item={item} />
            </li>
          ))}
        </ul>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { OpenSource },
  {
    title: `${companyName}: Open Source projects we support`,
    description: `A list of Open-Source projects we contribute to. Some of the projects help make our system unique.`,
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
    revalidate: 3600 * 12, // every 12 hours
  }
}
