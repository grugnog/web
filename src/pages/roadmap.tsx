import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { SectionContainer } from '@app/app/containers/section-container'
import { companyName } from '@app/configs'
import { Link } from '@app/app/typo/link'

function RoadMap({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`Technical Roadmap`}</Header>
        <p className='text-lg pb-5'>
          {companyName} doesn{`'`}t have a roadmap because we spend a lot of
          time listening to all users and then determining what features will
          have the most impact and be of the most benefit to everyone. If you
          want to see what we{`'`}ve been up to lately, here{`'`}s our
          <Link href='/changelog' className='text-blue-800'>
            changelog
          </Link>
          .
        </p>

        <h2 className='text-xl font-bold'>Prior Project Outline</h2>

        <p className='text-base'>
          Some of the prior goals include accessibility code generation fixes,
          performance targets, accessibility issue detection, and general
          portablity.
        </p>

        <div className='py-5'>
          <h3 className='text-xl font-bold'>Development Roadmap</h3>
          <p>
            You can view some of the active development{' '}
            <a
              href='https://github.com/orgs/A11yWatch/projects/2/views/1'
              className='underline text-blue-800'
              target={'_blank'}
              rel='noreferrer'
            >
              progress
            </a>{' '}
            here on github.
          </p>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { RoadMap },
  {
    description:
      'Our outline to better web accessibility visibility for every website. Some of current and next goals to come here.',
  }
)
