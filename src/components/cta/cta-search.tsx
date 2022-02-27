import React, { memo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'

import { rollStyles } from '@app/styles'
import { CtaSearchBar } from './searchbar'
import { SectionContainer } from '../general'

const useStyles = makeStyles((theme) => ({
  title: {
    width: '100%',
    display: 'flex',
    paddingLeft: '8vw',
    textAlign: 'left',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      wordBreak: 'break-word',
      display: 'block',
      textAlign: 'center',
      paddingLeft: 0,
      left: 20,
    },
  },
  smallFont: {
    [theme.breakpoints.down(900)]: {
      fontSize: '2.6rem',
    },
    [theme.breakpoints.down(800)]: {
      fontSize: '2rem',
    },
    [theme.breakpoints.down(600)]: {
      fontSize: '1.8rem',
    },
  },
}))

const rollStrings = [
  strings.monitoring,
  strings.fixer,
  strings.helper,
  strings.ai,
  strings.productivity,
]

const CtaSearchContainer = () => {
  const classes = useStyles()
  const roll = rollStyles()

  const Head = ({ children, component = 'h1' }: any) => {
    return (
      <Typography className={classes.title} component={component}>
        {children}
      </Typography>
    )
  }

  const Heading = ({ className, children }: any) => {
    return (
      <Typography
        component={'span'}
        variant={'h2'}
        className={className ?? classes.smallFont}
      >
        {children}
      </Typography>
    )
  }

  return (
    <SectionContainer>
      <CtaSearchBar checker={false}>
        <Head component='span'>
          <Heading component='span'>{`${strings.title} `}</Heading>
          <Heading className={roll.g} component='span'>
            {rollStrings.map((item: string, itemIndex: number): any => (
              <Heading
                component='span'
                // @ts-ignore
                className={`${roll.roll} ${roll[`d${itemIndex}`]} ${roll.gi} ${
                  classes.smallFont
                }`}
                key={item}
              >
                {item}
              </Heading>
            ))}
          </Heading>
        </Head>
      </CtaSearchBar>
    </SectionContainer>
  )
}

const CtaSearch = memo(CtaSearchContainer)

export { CtaSearch }
