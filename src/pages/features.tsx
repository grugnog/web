/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  MarketingDrawer,
  Section,
  PageTitle,
  Heading,
} from '@app/components/general'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import Image from 'next/image'

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  paper: {
    display: 'flex',
    flex: 1,
    padding: 12,
    margin: 3,
    border: `2px solid ${palette.secondary.main}`,
    [breakpoints.down(1100)]: {
      flexDirection: 'column',
    },
  },
  row: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
}))

function Features({ name }: PageProps) {
  const { paper, row } = useStyles()

  function FeatureHeading({ children }: { children: string }) {
    return (
      <Heading component='h4' bold={false}>
        {children}
      </Heading>
    )
  }

  function GeneralHeading({ children }: { children: string }) {
    return (
      <Heading variant='h4' component='h3'>
        {children}
      </Heading>
    )
  }

  const paperStyle = 'flex place-content-center bg-gray-800 my-4 rounded'

  return (
    <MarketingDrawer title={name} maxWidth='xl' footerSpacing>
      <PageTitle>{`Features`}</PageTitle>
      <Typography variant='subtitle1' component='h2' gutterBottom>
        Main Features
      </Typography>
      <div className={row}>
        <Paper className={paper}>
          <Section>
            <GeneralHeading>Issue Reporter</GeneralHeading>
            <FeatureHeading>
              Our issue reporter scans for problems with recommended solutions
              that are tuned for your website. Get notified when new issues
              occur with detailed information on what happened. The reporter
              runs on all your pages and you can run the test multiple times a
              day. Control how often you need the reporter to run to get alerted
              when you want.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/static/img/news.svg'}
                height={300}
                width={300}
                alt={'Issue reporter like news'}
              />
            </div>
          </Section>
        </Paper>
        <Paper className={paper}>
          <Section>
            <GeneralHeading>Auto CDN</GeneralHeading>
            <FeatureHeading>
              Include a custom cdn that fixes most of your issues at runtime.
              Our cdn uses a neural network that is composed of a couple of open
              nets like GoogleNet, ImageNet, and MobileNet. We also use common
              learning into the mixture to have a generic model. The networks in
              layers allow us to learn and declare images with extraordinary
              precision.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/static/img/cloud.svg'}
                height={300}
                width={300}
                alt={'Cloud cdn for fixing'}
              />
            </div>
          </Section>
        </Paper>
      </div>
      <div className={row}>
        <Paper className={paper}>
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
                src={'/static/img/park.svg'}
                height={300}
                width={300}
                alt={'Amusement park for website creation'}
              />
            </div>
          </Section>
        </Paper>
        <Paper className={paper}>
          <Section>
            <GeneralHeading>Temporary Script Remedy</GeneralHeading>
            <FeatureHeading>
              View your scripts that come from the scripts page. Verifiy exactly
              what goes into production with notes on whats being changed. If
              you need to make a tweak, edit the script in real time with our
              editor.
            </FeatureHeading>
            <div className={paperStyle}>
              <Image
                src={'/static/img/heal.svg'}
                height={300}
                width={300}
                alt={'Fix issues with custom remedies'}
              />
            </div>
          </Section>
        </Paper>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter({ Features })
