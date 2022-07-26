import { FC } from 'react'

import { Routes, APP_TYPE, DOMAIN_NAME } from '@app/configs'
import { Typography, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { strings } from '@app-strings'

import { Link } from './link'
import { FixedCopyRight } from './fixed-copy-right'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '2%',
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
    paddingTop: 8,
    display: 'block',
    paddingBottom: 20,
    listStyleType: 'none',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      fontSize: '1.5em',
    },
  },
  logo: {
    fontWeight: 'bold',
  },
  blockContainer: {
    flex: 0.2,
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
        let href = link

        if (blog) {
          // re-wrote to main website
          if (link[0] === '/') {
            href = `${DOMAIN_NAME}${link}`
          }
        }

        return (
          <li key={href}>
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

const Footer = ({ sticky, blog }: { sticky?: boolean; blog?: boolean }) => {
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
      className={`${classes.root}${
        sticky ? ` ${classes.sticky}` : ''
      } border-t`}
    >
      <Container maxWidth='lg'>
        <div className={classes.link}>
          <div className={`py-2 ${classes.blockContainer}`}>
            <div className='flex flex-wrap gap-x-4 pr-3'>
              <div>
                <Typography
                  className={classes.logo}
                  variant={'h4'}
                  color={'textSecondary'}
                >
                  {strings.appName}
                </Typography>
                <Typography
                  variant={'subtitle2'}
                  color={'textSecondary'}
                  component={'p'}
                >
                  Elevating accessibility for every website.
                </Typography>
              </div>
              <ul className='flex gap-x-6 place-items-center place-content-center'>
                <li>
                  <a
                    aria-label='GitHub'
                    href='https://github.com/a11ywatch'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <svg
                      aria-label='github'
                      height='18'
                      viewBox='0 0 14 14'
                      width='18'
                    >
                      <path
                        d='M7 .175c-3.872 0-7 3.128-7 7 0 3.084 2.013 5.71 4.79 6.65.35.066.482-.153.482-.328v-1.181c-1.947.415-2.363-.941-2.363-.941-.328-.81-.787-1.028-.787-1.028-.634-.438.044-.416.044-.416.7.044 1.071.722 1.071.722.635 1.072 1.641.766 2.035.59.066-.459.24-.765.437-.94-1.553-.175-3.193-.787-3.193-3.456 0-.766.262-1.378.721-1.881-.065-.175-.306-.897.066-1.86 0 0 .59-.197 1.925.722a6.754 6.754 0 0 1 1.75-.24c.59 0 1.203.087 1.75.24 1.335-.897 1.925-.722 1.925-.722.372.963.131 1.685.066 1.86.46.48.722 1.115.722 1.88 0 2.691-1.641 3.282-3.194 3.457.24.219.481.634.481 1.29v1.926c0 .197.131.415.481.328C11.988 12.884 14 10.259 14 7.175c0-3.872-3.128-7-7-7z'
                        fill='currentColor'
                        fillRule='nonzero'
                      ></path>
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    aria-label='Twitter'
                    href='https://twitter.com/a11ywatcher'
                    rel='noreferrer'
                    target='_blank'
                  >
                    <svg
                      aria-label='twitter'
                      fill='currentColor'
                      height='18'
                      width='18'
                      viewBox='0 0 18 15'
                    >
                      <path
                        d='M18 1.684l-1.687 1.684v.28c0 .307-.05.602-.123.886-.04 2.316-.777 5.387-3.816 7.81C6.404 17.115 0 12.907 0 12.907c5.063 0 5.063-1.684 5.063-1.684-1.126 0-3.376-2.243-3.376-2.243.563.56 1.689 0 1.689 0C.56 7.295.56 5.61.56 5.61c.563.561 1.689 0 1.689 0C-.563 3.368 1.124.561 1.124.561 1.687 3.368 9 4.49 9 4.49l.093-.046A6.637 6.637 0 0 1 9 3.368C9 1.353 10.636 0 12.656 0c1.112 0 2.094.506 2.765 1.286l.329-.163L17.437 0l-1.122 2.245L18 1.684z'
                        fillRule='nonzero'
                      ></path>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
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
