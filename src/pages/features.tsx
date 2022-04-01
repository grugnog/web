import React, { FC } from 'react'
import {
  MarketingDrawer,
  Section,
  PageTitle,
  Heading,
} from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Image from 'next/image'

const FeatureHeading: FC = ({ children }) => {
  return (
    <Heading component='h4' bold={false}>
      {children}
    </Heading>
  )
}

const GeneralHeading: FC = ({ children }) => {
  return (
    <Heading variant='h4' component='h3'>
      {children}
    </Heading>
  )
}

const { paper, row } = {
  paper: 'w-full p-3 m-2 border flex flex-grow md:flex-row md:w-1/2 rounded',
  row: 'flex flex-wrap md:flex-nowrap',
}

const paperStyle = 'flex place-content-center bg-gray-100 my-4 rounded'

function Features({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth='xl' footerSpacing>
      <PageTitle>{`Features`}</PageTitle>
      <h2 className={'text-lg mb-2'}>Main Features</h2>
      <div className={row}>
        <div className={paper}>
          <Section>
            <GeneralHeading>
              Accessibility Insights and Web Vitals
            </GeneralHeading>
            <FeatureHeading>
              Our inclusion insight reporter and monitor scans for problems with
              recommended solutions that are tuned for your website including
              WCAG 2.0 and beyond. Get notified when new issues occur with
              detailed information on what happened including recommendations.
              The reporter runs on all your pages and you can run the test
              multiple times a day. Control how often you need the reporter to
              run to get alerted along your schedule. Get Google Lighthouse
              reports on all of your pages at once to elevate web vitals and
              other metrics that help make a website inclusive.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/img/news.svg'}
                height={250}
                width={250}
                alt={'Issue reporter like news'}
              />
            </div>
          </Section>
        </div>
        <div className={paper}>
          <Section>
            <GeneralHeading>Accessibility CDN</GeneralHeading>
            <FeatureHeading>
              Include a personal custom CDN that fixes critical issues at
              runtime that would drastically hurt a users experience. Our cdn
              uses a neural network that is composed of a couple of open nets
              like GoogleNet, ImageNet, and MobileNet. We also use common
              learning into the mixture to have a generic model. The networks in
              layers allow us to learn and declare images with extraordinary
              precision. View your CDN at any time and even edit it as needed
              with the live script editor.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/img/cloud.svg'}
                height={250}
                width={250}
                alt={'Cloud cdn for fixing'}
              />
            </div>
          </Section>
        </div>
      </div>
      <div className={row}>
        <div className={paper}>
          <Section>
            <GeneralHeading>Website Visual Playground</GeneralHeading>
            <FeatureHeading>
              View your website with annotations of the issues on your page.
              Experiment with recommended fixes to validate changes before
              release in real-time. Test how your website would respond to
              visual updates on the fly.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/img/park.svg'}
                height={250}
                width={250}
                alt={'Amusement park for website creation'}
              />
            </div>
          </Section>
        </div>
        <div className={paper}>
          <Section>
            <GeneralHeading>Temporary Script Remedy</GeneralHeading>
            <FeatureHeading>
              View your website javascript remedies that come from the scripts
              page. Verifiy exactly what goes into production with notes on
              whats being changed. If you need to make a tweak, edit the script
              in real time with our editor. This is suppose to be a temporary
              solution so you can get to the fixes with a dedicated check list.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/img/heal.svg'}
                height={250}
                width={250}
                alt={'Fix issues with custom remedies'}
              />
            </div>
          </Section>
        </div>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Features },
  {
    description:
      'Features that are on the service and useful for building better websites.',
  }
)
