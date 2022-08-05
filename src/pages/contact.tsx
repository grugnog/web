import { Typography } from '@material-ui/core'
import { Box } from '@a11ywatch/ui'
import {
  MarketingDrawer,
  Spacer,
  PageTitle,
  Link,
} from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { CSSProperties } from 'react'
import type { PageProps } from '@app/types'

const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
} as CSSProperties

const circleStyle = Object.assign(
  {},
  {
    height: '38vh',
    width: '38vh',
    borderRadius: '19vh',
  },
  center
)

function Contact({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Lets have a Talk</PageTitle>
      <Typography
        variant='subtitle1'
        component='p'
        style={{ marginBottom: 60 }}
      >
        As a consultancy, {strings.appName} offers a lot more than just a nice
        AI tool to help mitigate accessibility errors, our team of engineers
        work seamless with your engineers and designers. We provide project
        leadership and technical expertise. We won’t just be an extra set of
        {`hands—we’ll`} help guide your strategy, provide best practices to
        ensure a maintainable and sustainable product, and help your team boost
        up along the way. {`Let's`} get started.
      </Typography>
      <div style={center}>
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
        <Spacer height={22} />
        <Typography variant='subtitle2' component='span'>
          or
        </Typography>
        <Spacer height={22} />
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

        <div className={'py-2'}>
          <Typography variant='body1' component='div' gutterBottom>
            If you want to learn more about open positions.
          </Typography>
          <Link href={'/careers'} className={'text-blue-700 underline'}>
            Careers
          </Link>
        </div>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Contact },
  {
    description: `Contact us here at ${strings.appName} with any questions you may have. Get the support you need to help your web accessibility efforts.`,
    intercom: true,
  }
)
