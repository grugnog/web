import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { strings } from '@app-strings'
import { makeStyles } from '@material-ui/core/styles'
import { SectionHeading } from '../text'

import {
  Accessibility as AccessibilityIcon,
  Notifications as NotificationsIcon,
  Code as CodeIcon,
  Cloud as CloudIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Compare as CompareIcon,
  TripOrigin as TripIcon,
  GitHub as GitHubIcon,
} from '@material-ui/icons'
import { SectionContainer } from '../general'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
    overflow: 'hidden',
    minWidth: '23vw',
    border: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
      flex: 'none',
      marginLeft: 0,
      marginRight: 0,
      marginBottom: '3px',
      width: '100%',
    },
  },
  flex: {
    flex: 1,
  },
}))

const RenderIcon = ({ index, ...props }: any): any =>
  React.createElement(
    (() => {
      let FeatureIcon

      switch (index) {
        case 0:
          FeatureIcon = AccessibilityIcon
          break
        case 1:
          FeatureIcon = NotificationsIcon
          break
        case 2:
          FeatureIcon = CodeIcon
          break
        case 3:
          FeatureIcon = CloudIcon
          break
        case 4:
          FeatureIcon = SecurityIcon
          break
        case 5:
          FeatureIcon = CompareIcon
          break
        case 6:
          FeatureIcon = TripIcon
          break
        case 7:
          FeatureIcon = GitHubIcon
          break
        default:
          FeatureIcon = SpeedIcon
          break
      }
      return FeatureIcon
    })(),
    props
  )

function FeatureItem({ item, index }: { item: any; index: number }) {
  const classes = useStyles()

  return (
    <div className={classes.paper}>
      <div className='flex space-x-2 pb-4 items-center'>
        <div className='flex rounded-3xl border w-10 h-10 justify-center items-center'>
          <RenderIcon index={index} fontSize='small' />
        </div>
        <Typography variant='h5' component='div'>
          {item.title}
        </Typography>
      </div>
      <div className={classes.flex} />
      <Typography variant='subtitle1' component='p' gutterBottom>
        {item.detail}
      </Typography>
    </div>
  )
}

const CtaFeatures = () => {
  return (
    <SectionContainer className={'bg-gray-100'}>
      <div>
        <SectionHeading>{strings.headers[2][0]}</SectionHeading>
        <Typography variant='h6' component='p' gutterBottom>
          {strings.headers[2][1]}
        </Typography>
      </div>
      <Grid container>
        {strings.features.map((item: any, index: number) => (
          <FeatureItem item={item} index={index} key={item.id} />
        ))}
      </Grid>
    </SectionContainer>
  )
}

export { CtaFeatures }
