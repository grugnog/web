import { FC, PropsWithChildren } from 'react'
import { MarketingDrawer, Section } from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Image from 'next/image'
import { FeaturesList } from '@app/components/stateless/marketing/features'
import { SectionContainer } from '@app/components/stateless/containers/section-container'
import { Header, Header2, Header3 } from '@app/components/general/header'
import { companyName } from '@app/configs'

const FeatureHeading: FC<PropsWithChildren> = ({ children }) => {
  return <p className='text-base font-medium  leading-7'>{children}</p>
}

const { paper, row } = {
  paper:
    'w-full p-3 border flex flex-grow md:flex-row md:w-1/2 place-items-between',
  row: 'flex flex-wrap md:flex-nowrap',
}

const paperStyle = 'flex place-content-center bg-gray-100 py-2 rounded'

function Features({ name }: PageProps) {
  return (
    <MarketingDrawer title={name} maxWidth='xl' footerSpacing>
      <SectionContainer container block>
        <div className='pb-2'>
          <Header>{companyName} Platform Features</Header>
          <p>
            Learn about features that make {companyName} stand out between the
            rest.
          </p>
        </div>
        <Header2 className='sr-only'>Tools built for the job</Header2>
        <div className={row}>
          <div className={paper}>
            <Section>
              <div>
                <Header3>{companyName} Web Accessibility Monitoring</Header3>
                <FeatureHeading>
                  Our web accessibility insight reporter and monitor scans for
                  problems with recommended solutions that are tuned for any
                  website using WCAG, Section508, and beyond. Get notified when
                  new issues occur with detailed information on what happened on
                  all pages. Control how often you need the reporter to run on
                  based on your schedule. Include critical{' '}
                  <a
                    href={'https://web.dev/vitals/'}
                    target={'_blank'}
                    rel={'noreferrer'}
                    className={'text-blue-600 underline'}
                  >
                    Web Vitals
                  </a>{' '}
                  across all urls at once. Our service is capable of handling
                  large websites with thousands - millions of pages, view the
                  <a
                    href='https://github.com/a11ywatch/github-actions/pull/34'
                    target={'_blank'}
                    rel={'noreferrer'}
                    className={'text-blue-600 underline'}
                  >
                    benchmarks
                  </a>
                  .
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/news.svg'}
                  height={175}
                  width={175}
                  alt={'Issue reporter like news'}
                />
              </div>
            </Section>
          </div>
          <div className={paper}>
            <Section>
              <div>
                <Header3>Accessibility CDN</Header3>
                <FeatureHeading>
                  Include a personal custom CDN that fixes critical issues at
                  runtime that would drastically hurt a users experience. Our
                  cdn uses a neural network that is composed of a couple of open
                  nets like GoogleNet, ImageNet, and MobileNet. We also use
                  common learning into the mixture to have a generic model. The
                  networks in layers allow us to learn and declare images with
                  extraordinary precision. View your CDN at any time and even
                  edit it as needed with the live script editor.
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/cloud.svg'}
                  height={175}
                  width={175}
                  alt={'Cloud CDN for javascript remediations'}
                />
              </div>
            </Section>
          </div>
        </div>
        <div className={row}>
          <div className={paper}>
            <Section>
              <div>
                <Header3>Website Visual Playground</Header3>
                <FeatureHeading>
                  View your website with elegant annotations of the issues on
                  your page. Experiment with recommended fixes to validate
                  changes before release in real-time. Verify how your website
                  would respond to visual updates with tools that help validate
                  contrast, alts, spacing, and more. The pre-built dynamic
                  javascript works with frameworks like Next.js, Angular, Astro,
                  or any other web technology.
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/park.svg'}
                  height={175}
                  width={175}
                  alt={'Amusement park for website creation'}
                />
              </div>
            </Section>
          </div>
          <div className={paper}>
            <Section>
              <div>
                <Header3>Embed Script Safeguard</Header3>
                <FeatureHeading>
                  View your website javascript remedies that come from the
                  scripts page. Verify exactly what goes into production with
                  notes on whats being changed. If you need to make a tweak,
                  edit the script in real time with our editor. This is suppose
                  to be a temporary solution so you can get to the fixes with a
                  dedicated check list. Bridge the gap between dynamic changes
                  real-time across all web pages.
                </FeatureHeading>
              </div>
              <div className={paperStyle}>
                <Image
                  src={'/img/heal.svg'}
                  height={175}
                  width={175}
                  alt={'Fix issues with custom remedies'}
                />
              </div>
            </Section>
          </div>
        </div>
        <Section>
          <FeaturesList alternative all />
        </Section>
      </SectionContainer>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { Features },
  {
    description: `Main features that are on the platform and how it works using ${companyName}.`,
  }
)
