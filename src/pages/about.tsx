import { MarketingDrawer } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { SectionContainer } from '@app/app/containers/section-container'

function About({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`About ${strings.appName}`}</Header>
        <p className='py-2 text-lg'>
          Our goal is to make the web easily accessible for everyone.
        </p>
        <p className='py-2 text-base'>
          Accessibility is crucial to making the web an equal shared experience
          for everyone, especially when it comes to information (www.). We bring
          all of these concerns to you at every step through conformance without
          any clunky overlay.
        </p>
        <Header2>Universal Web Inclusion</Header2>
        <p className='py-2 text-base'>
          Our vision starts with really believing that the web should be a
          smooth universal experience. The web has grown and adopted many
          assistive technologies to try to make this experience feel natural for
          everyone. One thing is that {`it's`} up to developers to assure this.
        </p>
        <Header3>Project Goals for Accessibility and Beyond</Header3>
        <p className='py-2 text-base'>
          One major goal that {`we’re`} trying to acheive is the ability to fix
          mobile applications accessibility errors using a SDK. This is a step
          into reducing work that can be repetitive and very time consuming.
        </p>
        <Header3>Assistive labels with the help of AI</Header3>
        <p className='py-2 text-base'>
          A big step into making a product usable across multiple devices is to
          have the program fully assistive through voice. With A11yWatch we are
          taking a step into providing dedication into machine learning and AI
          to generate assistive props, color contrast, alt tags, and much more.
        </p>
        <Header3>Quick and Insightful</Header3>
        <p className='py-2 text-base'>
          Take the process of making a website accessible with <b>n * pages</b>{' '}
          of your product which can lead to a lengthy timeline. We also provide
          a kit to automatically dive into the native assistive technologies to
          provide an amazing experience for everyone.
        </p>
        <h4 className='font-bold pb-2 text-2xl'>Portable across any system</h4>
        <p className='py-2 text-base'>
          You can use the platform in many ways to improve accessibility uptime.
          Using the system on your server as an enhancement to a feature/process
          or on your CI to make certain every page meets a certain standard as
          well.
        </p>
        <p className='py-2 text-base'>
          Feel free to email us on about issues that occur or contact us through
          the chat support at the bottom of the screen.
        </p>

        <p className='text-bold py-4 italic'>Founded late 2019</p>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { About },
  {
    title: `About ${companyName} and our role in the web accessibility community.`,
    description: `The story of the web-based accessibility tool built to make inclusion available to everyone.`,
  }
)
