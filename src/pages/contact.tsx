import { Box } from '@a11ywatch/ui'
import { MarketingDrawer, PageTitle, Link } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { CSSProperties } from 'react'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header2, Header3 } from '@app/components/general/header'
import { PricingCalculator } from '@app/components/general/pricing-calculator'

const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
} as CSSProperties

const circleStyle = Object.assign(
  {},
  {
    height: '25vh',
    width: '25vh',
    borderRadius: '12.5vh',
  },
  center
)

function Contact({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer block container>
        <PageTitle>Lets have a Talk</PageTitle>
        <p style={{ marginBottom: 60 }}>
          As a consultancy, {strings.appName} offers a lot more than just a nice
          AI tool to help mitigate accessibility errors, our team of engineers
          work seamless with your engineers and designers. We provide project
          leadership and technical expertise. We won’t just be an extra set of
          {`hands—we’ll`} help guide your strategy, provide best practices to
          ensure a maintainable and sustainable product, and help your team
          boost up along the way. {`Let's`} get started.
        </p>
        <Header2>Questions about our service?</Header2>
        <p>
          If you have any questions at all feel free to send us an email via the
          following:
        </p>
        <div style={center} className={'gap-y-2 py-8'}>
          <address>
            <a
              href={'mailto:support@a11ywatch.com'}
              className={'text-blue-500'}
              style={{
                textDecoration: 'none',
              }}
            >
              <Box
                style={circleStyle}
                className={'bg-blue-500 text-white font-bold text-xl'}
              >
                <span>Drop us an email</span>
              </Box>
            </a>
          </address>
          <p>or</p>
          <address>
            <a
              href={'tel:(863) 225-3695‬'}
              className={'text-blue-500'}
              style={{
                textDecoration: 'none',
              }}
            >
              <Box
                style={circleStyle}
                className={'bg-purple-500 text-white font-bold text-xl'}
              >
                <span>Call Us</span>
              </Box>
            </a>
          </address>
        </div>
        <div className='space-y-3 pt-4'>
          <Header3>Interested in Accessibility Services?</Header3>
          <p>
            If you need help with auditing a page or website we can get this
            done across any tech stack.
          </p>
          <PricingCalculator />
          <div className={'py-2'}>
            <p className='pb-2'>
              If you want to learn more about some of our past positions.
            </p>
            <Link href={'/careers'} className={'text-blue-700 underline'}>
              Careers
            </Link>
          </div>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Contact },
  {
    title: `${strings.appName}: Get in touch with us`,
    description: `Contact us here at ${strings.appName} with any questions you may have. Get the support you need to help your web accessibility efforts.`,
  }
)
