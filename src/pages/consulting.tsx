import { MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import {
  Header,
  Header2,
  Header3,
  Header4,
} from '@app/components/general/header'

const LanguageSupport = ['Web', 'Mobile', 'Embed', 'Cloud', 'IoT']

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
        <Header2>WCAG Web Compliance Prevents Legal Risk</Header2>
        <p>
          We make sure to bring your product WCAG2.0 compliant without using any
          overlays, toolbars, and other manual processes that do not correct the
          issues without the user input. When we use AI we validate that the
          probability meets high standards or we make sure that the remedies are
          corrected by a human. This allows us to deliver compliance at a high
          level of accuracy.
        </p>
        <Header3>Professional Support</Header3>
        <div className='py-2'>
          <p>
            {strings.appName} can provide expert level support along the
            following technologies for accessibility, UI, and UX. We can also
            help setup self hosting A11yWatch for private servers/usage.
          </p>
          <ul className='space-y-2 pt-4'>
            {LanguageSupport.map((item) => {
              return (
                <li key={item}>
                  <p>- {item}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='py-2'>
          <Header4>Custom Work</Header4>
          <ul className='space-y-2 py-2'>
            {CustomWork.map((item) => {
              return (
                <li key={item}>
                  <p>- {item}</p>
                </li>
              )
            })}
          </ul>
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
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Consulting },
  {
    description:
      'Need a web accessibility expert now? Hire developers that understand WCAG, Section508, and other regulations to help make your product inclusive.',
  }
)
