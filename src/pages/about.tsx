import React from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function About({ name }: PageProps) {
  const bold = { fontWeight: 600 }
  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>{`About ${strings.appName}`}</PageTitle>
      <Typography variant='body1' component='p' gutterBottom>
        Our goal is to make the web easily accessible for everyone.
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Accessibility is crucial to making the web an equal shared experience
        for everyone, especially when it comes to information (www.). We bring
        all of these concerns to you at every step through conformance without
        any clunky overlay.
      </Typography>
      <Typography variant='h4' component='h2' gutterBottom style={bold}>
        Universal Web Vision
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Our vision starts with really believing that the web should be a smooth
        universal experience. The web has grown and adopted many assistive
        technologies to try to make this experience feel natural for everyone.
        One thing is that {`it's`} up to developers to assure this.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Goals
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        One major goal that we are trying to acheive is the ability to fix a
        website or mobile applications ada errors with a SDK or cdn. This is a
        step into reducing work that can be repetitive and very time consuming.
      </Typography>
      <Typography variant='h4' component='h4' gutterBottom style={bold}>
        Assistive labels powered by AI
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        A big step into making a product usable across multiple devices is to
        have the program fully assistive through voice. With A11yWatch we are
        taking a step into providing extreme dedication into machine learning
        and AI to generate assistive props, color contrast, alt tags, and much
        more with accuracy.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Fast like Really Fast
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Take the process of making a website accessible with <b>n * pages</b> of
        your product which can lead to a lengthy timeline. With A11yWatch tech
        we can provide a kit to automatically dive into the native assistive
        technologies to provide an amazing experience for everyone.
      </Typography>
      <Typography variant='h4' component='h2' gutterBottom style={bold}>
        Founded late 2019
      </Typography>
      <Typography variant='body1' component='p' gutterBottom>
        Feel free to email us on any issues if they occur or contact us through
        the intercom chat support at the bottom of the screen.
      </Typography>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { About },
  {
    description: `The story of the web-based accessibility tool built to make a11y available to everyone.`,
  }
)
