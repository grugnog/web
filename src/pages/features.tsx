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
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

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

  function Image({ src, alt }: { src: string; alt: string }) {
    return (
      <img
        src={src}
        className={`hide-print`}
        alt={alt}
        height={500}
        width={400}
      />
    )
  }

  return (
    <MarketingDrawer title={name} maxWidth='xl' footerSpacing>
      <PageTitle>{`${strings.appName} Features`}</PageTitle>
      <Typography variant='subtitle1' component='h2' gutterBottom>
        Main Features
      </Typography>
      <div className={row}>
        <Paper className={paper}>
          <Section>
            <GeneralHeading>Issue Reporter</GeneralHeading>
            <FeatureHeading>
              Our issue reporter scans for problems with recommended solutions
              that are tuned for your website. Get notified as issues occur with
              detailed information on what happened. The reporter runs on all
              your pages and you can run the test multiple times a day.
            </FeatureHeading>
          </Section>
          <Image
            src='/static/img/task_list.svg'
            alt={'women and accessible app'}
          />
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
          </Section>
          <Image src='/static/img/cloud_files.svg' alt={'cloud stored'} />
        </Paper>
      </div>
      <div className={row}>
        <Paper className={paper}>
          <Section>
            <GeneralHeading>Website Visual Playground</GeneralHeading>
            <FeatureHeading>
              View your website with annotations of the issues on your page.
              Experiment with recommended fixes to validate changes before
              release in real-time.
            </FeatureHeading>
          </Section>
          <Image
            src='/static/img/heatmap.svg'
            alt={'website playground to test fixes'}
          />
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
          </Section>
          <Image src='/static/img/code_snippets.svg' alt={'code snippets'} />
        </Paper>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter({ Features })
