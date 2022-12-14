import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { SectionContainer } from '@app/app/containers/section-container'
import { companyName } from '@app/configs'

const checklistLinks = [
  { href: 'https://a11yproject.com/checklist', name: 'A11y Checklist' },
  {
    name: 'ADA Checklist',
    href: 'https://medium.com/@krisrivenburgh/the-ada-checklist-website-compliance-guidelines-for-2019-in-plain-english-123c1d58fad9',
  },
  {
    name: 'Accessibility Checklist',
    href: 'https://webflow.com/accessibility/checklist',
  },
  {
    name: 'Accessibility by Mozilla',
    href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility',
  },
  {
    name: 'Section508 Testing',
    href: 'https://www.section508.gov/test/testing-overview/',
  },
]

const linkStyle = {
  fontSize: 16,
  fontWeight: 600,
  textDecoration: 'underline',
}

function WebAccessibility({ name }: PageProps) {
  return (
    <MarketingDrawer title={name}>
      <SectionContainer container block>
        <Header>{companyName} Web Accessibility</Header>
        <p className='pb-2 md:w-2/3'>
          Improve your {`product's`} web accessibility from the start of the
          building process quickly. Follow these principles to improve your
          websites inclusion with some foundational rules.
        </p>
        <h2 className='text-2xl py-2 font-bold'>Inclusion step by step</h2>
        <h3 className='text-xl font-bold'>Color</h3>
        <p className='pb-2'>
          Make clear distinct color design choices by using{' '}
          <a
            className={'text-blue-600'}
            href={'https://material.io/design/color/#'}
            style={linkStyle}
            target='_blank'
            rel='noreferrer'
          >
            Googles Material Design Color Tool
          </a>{' '}
          and{' '}
          <a
            className={'text-blue-600'}
            href={'https://contrast-ratio.com/'}
            style={linkStyle}
            target='_blank'
            rel='noreferrer'
          >
            Contrast Ratio
          </a>
          .
        </p>
        <h3 className='text-xl font-bold'>WCAG Principles</h3>
        <p className='pb-2'>
          Application foundations that help improve your audience inclusion and
          reach.
        </p>
        <ul className='space-y-2 pb-2 list-disc px-6 pt-4 pb-8'>
          <li>
            <a
              className={'text-blue-600'}
              target='_blank'
              href={
                'https://www.w3.org/WAI/fundamentals/accessibility-principles/'
              }
              rel='noreferrer'
              style={linkStyle}
            >
              WAI Accessibility Principles
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              target='_blank'
              href={'https://www.w3.org/WAI/standards-guidelines/wcag/'}
              rel='noreferrer'
              style={linkStyle}
            >
              WCAG Standards
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              target='_blank'
              href={'https://www.w3.org/TR/WCAG21/'}
              rel='noreferrer'
              style={linkStyle}
            >
              WCAG 2.1 Guidelines
            </a>
          </li>
        </ul>
        <h3 className='text-xl font-bold'>Accessibility Checklist</h3>
        <p className='pb-2'>
          A couple of quick checklists to improve your contents accessibility.
        </p>
        <ul className='space-y-2 pb-2 list-disc px-6 pt-4 pb-8'>
          {checklistLinks.map(({ href, name }: any) => {
            return (
              <li key={href}>
                <a
                  className={'text-blue-600'}
                  href={href}
                  target='_blank'
                  style={linkStyle}
                  rel='noreferrer'
                >
                  {name || href}
                </a>
              </li>
            )
          })}
        </ul>
        <h3 className='text-xl font-bold'>Features</h3>
        <p className='pb-2'>
          Accessibility comes in many forms, with macOS/iphones you can enhance
          a major part of the application so {`it's`} best we understand the
          technologies underneath. This allows us to use these features to our
          advantage to better assist users.
        </p>
        <ul className='space-y-2 pb-2 list-disc px-6 pt-4 pb-8'>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://www.apple.com/accessibility/iphone/vision/'}
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Apple Accesibility Vision
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://www.google.com/accessibility/'}
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Google Accesibility
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={
                'https://business.twitter.com/en/blog/our-accessibility-team-shares-best-practices.html'
              }
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Accessibility on Twitter
            </a>
          </li>
        </ul>
        <h3 className='text-xl font-bold'>
          React components with accessibility in mind
        </h3>
        <p className='pb-2'>
          If you use react and start on a new project consider looking into
          chakra-ui. They take care of a lot of the things that we can easily
          miss when trying to deliver a website fast.
        </p>
        <ul className='space-y-2 pb-2 list-disc px-6 pt-4 pb-8'>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://chakra-ui.com'}
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Chakra UI
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://react-icons.github.io/react-icons/icons?name=gr'}
              rel='noreferrer'
              target='_blank'
              style={linkStyle}
            >
              GrIcons
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://inclusive-components.design/'}
              rel='noreferrer'
              target='_blank'
              style={linkStyle}
            >
              Inclusive Components Design
            </a>
          </li>
        </ul>
        <h3 className='text-xl font-bold'>Avoid Intense Animations</h3>
        <p className='pb-2'>
          Animations can be very powerful in describing a message using the
          right techniques but, sometimes they can also make the experience
          unpleasant. Its important to understand how to make your animations
          smooth so that users can view it. Theres tools built in to the dev
          tools in most browsers like chrome to detect FPS + simulating on a
          test set of devices to see if everyone will perceive the effect the
          same.
        </p>
        <h3 className='text-xl font-bold'>
          Understand how performance impacts accessibility
        </h3>
        <p className='pb-2'>
          Performance goes into web accessibility in many forms. In certain
          situations even voice over can be impacted by heavy usage of
          javascript in incorrect locations. Try to move certain synchronous
          methods outside of the render loop as much as possible. Avoid doing
          sorts on large array elements inside render as well unless you know
          exactly how the flow of control for the render cycle will be impacted,
          a solution could be to move sequences into seperate buckets on event
          processing. Theres a lot more that can be done to improve performance
          with javascript including using <em>queueMicroTask</em> and
          understanding how the event loop works. When theres a need for a lot
          of work using web workers could also help or simply moving the
          processing to the server.
        </p>
        <h3 className='text-xl font-bold'>Practice VoiceOver</h3>
        <p className='pb-2'>
          VoiceOver on iOS is very powerful and is huge for assisting users with
          vision impairment. VoiceOver runs natively so this adds a process onto
          your normal application (slows it down). This means that certain
          things that are not on the native end for speed can provide a not so
          ideal experience. {`It's`} important to test how your application will
          run with this enabled from aria-label, accessibility assetive props,
          performance and more.
        </p>
        <ul className='space-y-2 pb-2 list-disc px-6 pt-4 pb-8'>
          <li>
            <a
              className={'text-blue-600'}
              href={
                'https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios'
              }
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Apple Turn on Voice Over
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={
                'https://support.google.com/accessibility/android/answer/6283677?hl=en'
              }
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Android TalkBack
            </a>
          </li>
        </ul>
        <h4 className='text-xl font-bold'>More Resources</h4>
        <ul className='space-y-2 py-2 list-disc px-6'>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://a11yresources.webflow.io'}
              target='_blank'
              rel='noreferrer'
              style={linkStyle}
            >
              A11y Resources
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://www.a11ytips.dev'}
              target='_blank'
              rel='noreferrer'
              style={linkStyle}
            >
              A11y Tips
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={'https://www.getstark.co'}
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Stark
            </a>
          </li>
          <li>
            <a
              className={'text-blue-600'}
              href={
                'https://www.websiteplanet.com/blog/website-accessibility-made-easy-ultimate-guide/'
              }
              target='_blank'
              style={linkStyle}
              rel='noreferrer'
            >
              Website Planet Website Accessibility Made Easy Ultimate Guide
            </a>
          </li>
        </ul>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { WebAccessibility },
  {
    description:
      'Free web accessibility resources that help create accessible apps. Leverage tools at hand to guide, check, and maintain your reach.',
  }
)
