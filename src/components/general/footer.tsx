import React, { FC } from 'react'

import { Routes, APP_TYPE, DOMAIN_NAME } from '@app/configs'
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'

import { Link } from './link'
import { FixedCopyRight } from './fixed-copy-right'
import {
  GithubBadge,
  TwitterBadge,
  FacebookBadge,
  LinkedinBadge,
} from '../badges'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '6%',
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  linkContainer: {
    marginTop: 12,
    display: 'block',
    paddingBottom: 20,
    listStyleType: 'none',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      fontSize: '1.5em',
    },
  },
  socialContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
  },
  logo: {
    fontWeight: 'bold',
  },
  blockContainer: {
    flex: 0.2,
    marginRight: '1.5em',
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  sticky: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
  },
  linkSpace: {
    lineHeight: 2,
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.95em',
    },
  },
  linkHeading: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.7em',
      fontWeight: '600',
    },
  },
  spacing: {
    paddingTop: '20vh',
  },
}))

interface NavLinks {
  className?: string
  filterType?: string
  blog?: boolean // if coming from the blog sub domain
}

const baseRoutes = [...Routes].reverse()

const NavLinks: FC<NavLinks> = ({ className, filterType, blog }) => {
  const routes = baseRoutes.filter(({ type }: any) => type === filterType)

  return (
    <>
      {routes.map(({ href: link, name }: any) => {
        const href =
          blog && link !== `${DOMAIN_NAME?.replace('.com', '.blog')}`
            ? `${DOMAIN_NAME}${link}`
            : link

        return (
          <li key={href + name}>
            <Link
              className={className}
              href={href}
              rel={href.includes('https') ? 'noopener' : undefined}
              target={href.includes('https') ? '_blank' : undefined}
            >
              {name}
            </Link>
          </li>
        )
      })}
    </>
  )
}

const Footer = ({
  sticky,
  footerSpacing,
  blog,
}: {
  sticky?: boolean
  footerSpacing?: boolean
  blog?: boolean
}) => {
  const classes = useStyles()

  const SectionLinks = ({ title }: { title: string }) => {
    return (
      <div className={classes.blockContainer}>
        <Typography
          variant={'h4'}
          className={classes.linkHeading}
          color={'textSecondary'}
        >
          {title}
        </Typography>
        <ul className={classes.linkContainer}>
          <NavLinks
            filterType={title.toLowerCase()}
            className={classes.linkSpace}
            blog={blog}
          />
        </ul>
      </div>
    )
  }

  return (
    <footer
      className={`${classes.root}${sticky ? ` ${classes.sticky}` : ''}${
        footerSpacing ? ` ${classes.spacing}` : ''
      }`}
    >
      <Container maxWidth='lg'>
        <div className={classes.link}>
          <div className={classes.blockContainer}>
            <Typography
              className={classes.logo}
              variant={'h4'}
              color={'textSecondary'}
            >
              {strings.appName}
            </Typography>
            <Typography variant={'subtitle2'} color={'textSecondary'}>
              Elevating accessibility for every website.
            </Typography>
            <ul
              className={`${classes.linkContainer} ${classes.socialContainer}`}
            >
              {[
                { Icon: TwitterBadge },
                { Icon: GithubBadge },
                { Icon: FacebookBadge },
                { Icon: LinkedinBadge },
              ].map(({ Icon }: any, i: number) => (
                <li className={classes.link} key={i}>
                  <Icon inline />
                </li>
              ))}
            </ul>
          </div>
          <SectionLinks title={'Explore'} />
          <SectionLinks title={'Resources'} />
          <SectionLinks title={'Company'} />
          <SectionLinks title={'Legal'} />
        </div>
        {APP_TYPE !== 'main' ? (
          <div className={classes.linkContainer}>
            <Typography variant={'body2'}>
              {strings.appName} Group ® Brands:
            </Typography>
            <Typography
              component={'a'}
              href={`https://www.${strings.appName.toLowerCase()}.com`}
              variant={'body2'}
              color={'secondary'}
              style={{ marginLeft: 6 }}
            >
              {strings.appName}
            </Typography>
          </div>
        ) : null}
      </Container>
      <div className='px-2 flex place-content-center'>
        <FixedCopyRight />
      </div>
    </footer>
  )
}

export { Footer }
