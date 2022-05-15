import React from 'react'
import { Typography, List, ListItem } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { theme } from '@app-theme'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function WebAccessibility({ name }: PageProps) {
  const checklistLinks = [
    { href: 'https://a11yproject.com/checklist' },
    {
      href:
        'https://medium.com/@krisrivenburgh/the-ada-checklist-website-compliance-guidelines-for-2019-in-plain-english-123c1d58fad9',
    },
    {
      href: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility',
    },
    {
      href: 'https://www.section508.gov/test/testing-overview/',
    },
  ]

  const linkStyle = {
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontSize: 16,
    fontWeight: 600,
  }

  const bold = { fontWeight: 600 }

  return (
    <MarketingDrawer title={name}>
      <PageTitle>Web Accessibility</PageTitle>
      <Typography variant='subtitle1' component='h2' gutterBottom>
        Improve your {`product's`} web accessibility from the start of the
        building process quickly. Follow these principles to improve your
        websites accessibility with some building block rules.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Color
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        Make clear distinct color design choices by using googles material
        design color tool{' '}
        <a
          href={'https://material.io/design/color/#'}
          style={linkStyle}
          target='_blank'
          rel='noreferrer'
        >
          https://material.io/design/color/#
        </a>
        .
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Principles
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        Application foundations to understand to make your product reach out to
        more audiences{' '}
        <a
          target='_blank'
          href={'https://www.w3.org/WAI/fundamentals/accessibility-principles/'}
          rel='noreferrer'
          style={linkStyle}
        >
          https://www.w3.org/WAI/fundamentals/accessibility-principles/
        </a>
        .
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Checklist
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        A couple of quick checklists to improve your contents accessibility.
      </Typography>
      <List>
        {checklistLinks.map(({ href }: any) => {
          return (
            <ListItem
              href={href}
              component={'a'}
              key={href}
              target='_blank'
              style={linkStyle}
            >
              {href}
            </ListItem>
          )
        })}
      </List>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Features
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        Accessibility comes in many forms, with macOS/iphones you can enhance a
        major part of the application so {`it's`} best we understand the
        technologies underneath. This allows us to use these features to our
        advantage to better assist users or ensure your product just works.
      </Typography>
      <List>
        <ListItem
          href={'https://www.apple.com/accessibility/iphone/vision/'}
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          https://www.apple.com/accessibility/iphone/vision/
        </ListItem>
      </List>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        React components with accessibility in mind
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        If you use react and start on a new project consider looking into
        chakra-ui. They take care of a lot of the things that we can easily miss
        when trying to deliver a website fast.
      </Typography>
      <List>
        <ListItem
          href={'https://chakra-ui.com'}
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          Chakra UI
        </ListItem>
        <ListItem
          href={'https://react-icons.github.io/react-icons/icons?name=gr'}
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          GrIcons
        </ListItem>
      </List>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Avoid Intense Animations
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        Animations can be very powerful in describing a message using the right
        techniques but, sometimes they can also make the experience unpleasant.
        Its important to understand how to make your animations smooth so that
        users can view it. Theres tools built in to the dev tools in most
        browsers like chrome to detect FPS + simulating on a test set of devices
        to see if everyone will perceive the effect the same.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Understand how performance impacts accessibility
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        Performance goes into web accessibility in many forms. In certain
        situations even voice over can be impacted by heavy usage of javascript
        in incorrect locations. Try to move certain synchronous methods outside
        of the render loop as much as possible. Avoid doing sorts on large array
        elements inside render as well unless you know exactly how the flow of
        control for the render cycle will be impacted, a solution could be to
        move sequences into seperate buckets on event processing. Theres a lot
        more that can be done to improve performance with javascript including
        using <em>queueMicroTask</em> and understanding how the event loop
        works. When theres a need for a lot of work using web workers could also
        help or simply moving the processing to the server.
      </Typography>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        Practice VoiceOver
      </Typography>
      <Typography variant='subtitle1' component='p' gutterBottom>
        VoiceOver on iOS is very powerful and is huge for assisting users with
        vision impairment. VoiceOver runs natively so this adds a process onto
        your normal application (slows it down). This means that certain things
        that are not on the native end for speed can provide a not so ideal
        experience. {`It's`} important to test how your application will run
        with this enabled from aria-label, a11y assetive props, performance and
        more.
      </Typography>
      <List>
        <ListItem
          href={
            'https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios'
          }
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          https://support.apple.com/guide/iphone/turn-on-and-practice-voiceover-iph3e2e415f/ios
        </ListItem>
      </List>
      <Typography variant='h4' component='h3' gutterBottom style={bold}>
        More Resources
      </Typography>
      <List>
        <ListItem
          href={'https://a11yresources.webflow.io'}
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          https://a11yresources.webflow.io
        </ListItem>
        <ListItem
          href={'https://www.a11ytips.dev'}
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          https://www.a11ytips.dev
        </ListItem>
        <ListItem
          href={'https://www.getstark.co'}
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          Stark
        </ListItem>
        <ListItem
          href={
            'https://www.websiteplanet.com/blog/website-accessibility-made-easy-ultimate-guide/'
          }
          component={'a'}
          target='_blank'
          style={linkStyle}
        >
          https://www.websiteplanet.com/blog/website-accessibility-made-easy-ultimate-guide/
        </ListItem>
      </List>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { WebAccessibility },
  {
    description:
      'Web accessibility improvement for everyone using with resources to learn. Leverage tools at hand to guide, check, and maintain your website.',
  }
)
