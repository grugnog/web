import React from 'react'
import {
  MarketingDrawer,
  Spacer,
  Circle,
  Heading,
  PaperSection,
  PageTitle,
} from '@app/components/general'
import { strings } from '@app-strings'
import { theme } from '@app-theme'
import { metaSetter } from '@app/utils'
import NextImage from 'next/image'
import type { PageProps } from '@app/types'

function Image({ src, alt }: { src: string; alt: string }) {
  return (
    <NextImage
      alt={alt}
      src={src}
      className='print:hidden'
      height={350}
      width={400}
    />
  )
}

function RoadMap({ name }: PageProps) {
  const classes = {
    circleRight: '-right-2',
    circleLeft: '-left-2',
    circle: 'absolute z-50 -top-5',
  }

  return (
    <MarketingDrawer title={name} footerSpacing maxWidth='xl'>
      <PageTitle>{`${strings.appName} Technical Roadmap`}</PageTitle>
      <h2>Project Outline</h2>
      <PaperSection rightMargin={false}>
        <Heading>Web Accessibility Progression</Heading>
        <Heading variant='h6' component='h4' bold={false}>
          It is important to note the steps we are trying to take for the
          ultimate level of compliance with minimal downsides along the way.
          This means we acknowledge that things arent perfect but, we are trying
          our best to provide the best experience to our capabilities. The
          phases we have set are according to difficulty and time it will take
          for the solution. We have rough estimates to better our judgement on
          when we can provide the features to come. We are currently on Phase 3
        </Heading>
      </PaperSection>
      <Spacer height={10} />
      <PaperSection row>
        <Circle className={`${classes.circle} ${classes.circleLeft}`}>1</Circle>
        <Image src='/img/server.svg' alt={'javascript fixes from a cdn'} />
        <div>
          <Heading>JS execution fixes</Heading>
          <Heading variant='h6' component='h4' bold={false}>
            Our initial and simplest phase to get some level of fixes is to
            provide a CDN to override the issues at runtime using javascript. We
            can manipulate the dom to apply the fixes as soon as the page loads.
            The manipulation of the dom in our context can be very minimal and
            fast since everything is synchronous. This means that content can
            adjust quick enough to prevent elements from shifting and
            flickering.
          </Heading>
        </div>
      </PaperSection>
      <PaperSection rightMargin={false} row>
        <Circle className={`${classes.circle} ${classes.circleRight}`}>
          2
        </Circle>
        <div>
          <Heading>Editable Scripts</Heading>
          <Heading variant='h6' component='h4' bold={false}>
            AI and machine learning has a bit to go to have spot on labeling for
            image recognition. This means we need to have a level of accuracy
            for certainty on our fix being correct. If the probability is not
            near 100% we need to allow developers to edit the scripts to the
            proper label. Using the script panel you should be able to live edit
            the script so that the changes can be applied on your live website.
          </Heading>
        </div>
        <Image src='/img/type_code.svg' alt={'edit your code with accuracy'} />
      </PaperSection>
      <PaperSection
        style={{
          border: `2px solid ${theme.palette.secondary.main}`,
        }}
        row
      >
        <Circle className={`${classes.circle} ${classes.circleLeft}`}>3</Circle>
        <Image src='/img/source_code.svg' alt='source code visual' />
        <div>
          <Heading>Compilation Fixes</Heading>
          <Heading variant='h6' component='h4' bold={false}>
            With fixes applied at compile time we no longer need to rely on
            javascript to load the solutions initially. This is a huge benefit
            since the speed of scripts varies greatly on the users device. This
            process would be hooked into your deployment or build steps so that
            way it can run seamless.
          </Heading>
        </div>
      </PaperSection>
      <PaperSection rightMargin={false} row>
        <Circle className={`${classes.circle} ${classes.circleRight}`}>
          4
        </Circle>
        <div>
          <Heading>Development Code Generation</Heading>
          <Heading variant='h6' component='h4' bold={false}>
            The last step is to provide a way to hook into your development
            process that runs in your own environment. With the dev time support
            we can provide helpful features like injecting visual annotations
            into your actual application so that you can provide the remedies
            automatically to code. At this level we will support the most
            popular front-end frameworks first besides basic html support.
          </Heading>
        </div>
        <Image
          src='/img/js_frameworks.svg'
          alt={'languages supported a variation'}
        />
      </PaperSection>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { RoadMap },
  {
    description:
      'The path to better and build automated web accessibility certainty.',
  }
)
