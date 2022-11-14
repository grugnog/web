import { Typography, List, ListItem } from '@material-ui/core'
import { MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/app/containers/section-container'
import {
  Header,
  Header2,
  Header3,
  Header4,
} from '@app/components/general/header'

const LanguageSupport = ['Web', 'Mobile', 'Embedd', 'Cloud', 'IoT']

const CustomWork = [
  'Give you an estimate of time and price if the work is straightforward.',
  'Give alternative solutions depending on project situation.',
  'Decline the work due to timing/etc.',
]

function Consulting({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{strings.consulting}</Header>
        <p>
          {strings.appName} has experts when it comes to accessibility who can
          provide a hands on or off consulting. We provide services amongst web,
          mobile, and server side expertise to better your applications
          experience. Although some country laws require your website to be
          compliant the majority of websites are not on the internet.
        </p>
        <Header2>WCAG Web Compliance Reduces Legal Risk</Header2>
        <p>
          We make sure to bring your product WCAG2.0 compliant without using any
          overlays, toolbars, and other manual processes that do not correct the
          issues without the user input. When we use AI we validate that the
          probability meets high standards or we make sure that the remedies are
          corrected by a human. This allows us to deliver compliance at a high
          level of accuracy.
        </p>
        <Header3>Professional Support</Header3>
        <p>
          {strings.appName} can provide expert level support along the following
          technologies for accessibility, UI, and UX. We also can help setup
          self hosting A11yWatch for private servers/usage.
        </p>
        <List>
          {LanguageSupport.map((item) => {
            return (
              <ListItem key={item}>
                <Typography variant='subtitle1' component='p' gutterBottom>
                  - {item}
                </Typography>
              </ListItem>
            )
          })}
        </List>
        <Header4>Custom Work</Header4>
        <List>
          {CustomWork.map((item) => {
            return (
              <ListItem key={item}>
                <Typography variant='subtitle1' component='p' gutterBottom>
                  - {item}
                </Typography>
              </ListItem>
            )
          })}
        </List>
        <div className='text-base'>
          For more information on consulting please send a email to{' '}
          <address>
            <a
              href={'mailto:support@a11ywatch.com'}
              className={'text-blue-700 underline'}
            >
              support@a11ywatch.com
            </a>
          </address>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Consulting },
  {
    description:
      'Need a web accessibility expert fast? Get audits using manual and automated testing that save time and effort on ADA & WCAG for any project.',
  }
)
