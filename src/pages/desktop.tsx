import { MarketingDrawer } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { Header } from '@app/components/general/header'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { companyName } from '@app/configs'

function DesktopApp({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} footerSpacing>
      <SectionContainer container block>
        <Header>{`Desktop App`}</Header>
        <p className='py-2 font-light'>Beta</p>
        <p className='text-lg pb-5'>
          The new cross platform desktop app brings integrations that work with
          native features of your system and more.
        </p>

        <h2 className='text-xl font-bold'>
          Desktop comes one to one with web features
        </h2>

        <p className='text-base'>
          Use all the features you are used to from the web app with our desktop
          application that works for Mac, Linux, and Windows systems.
        </p>

        <div className='py-5'>
          <h3 className='text-xl font-bold'>Focus on what matters to you</h3>
          <p>
            The desktop app is being actively developed at{' '}
            <a
              href='https://github.com/a11ywatch/web#start-web-or-desktop'
              className='underline text-blue-800'
              target={'_blank'}
              rel='noreferrer'
            >
              Desktop Github
            </a>
            .
          </p>

          <p>
            Downloading the desktop application from our website is coming soon.
            For now you need to install it from our repo.
          </p>
        </div>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { DesktopApp },
  {
    title: `The ${companyName} desktop app for Mac, Linux, and Windows.`,
    description: `Get the ${companyName} desktop app that brings the focus on accessibility goals in one direct app.`,
  }
)
