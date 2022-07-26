import { Fragment, memo } from 'react'
import { Container } from '@material-ui/core'
import { navigationStyles } from '@app/styles/navigation'
import { strings } from '@app-strings'
import { NavBarTitle, MarketingNavMenu } from '../navigation'
import { SearchBar } from '../searchbar'
import { NavBar } from '../navigation/navbar'
import { Footer } from '../footer'
import { Link } from '../link'

export function MarketingDrawerContainer({
  children,
  initClosed,
  renderCtaSearch,
  title,
  navPosition,
  maxWidth = 'xl',
  footerSpacing,
  index,
  emptyFooter,
  emptyNav,
  authenticated,
}: any) {
  const classes = navigationStyles()

  const padding = index ? 0 : '0.25rem'

  return (
    <Fragment>
      {emptyNav ? null : (
        <NavBar
          position={navPosition}
          marketing
          className={classes.appBar}
          authenticated={authenticated}
          marketingLinks={
            <MarketingNavMenu
              home={`/${String(title).toLowerCase()}`}
              className={classes.horizontal}
              registerClassName={classes.register}
              classHiddenMobile={classes.classHiddenMobile}
            />
          }
        >
          <div className={classes.navContainer}>
            <NavBarTitle
              title={strings.appName}
              href='/'
              component={Link}
              marketing
            />
            {renderCtaSearch ? (
              <div
                style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}
              >
                <SearchBar placeholder={'Enter website url...'} noWidth cta />
              </div>
            ) : null}
          </div>
        </NavBar>
      )}
      <main
        className={`${initClosed ? '' : classes.content}${
          footerSpacing ? ' pb-[20vh]' : ''
        }`}
        id='main-content'
      >
        {initClosed ? (
          children
        ) : (
          <Container
            maxWidth={maxWidth}
            style={{ paddingLeft: padding, paddingRight: padding }}
          >
            {children}
          </Container>
        )}
      </main>
      {initClosed || emptyFooter ? null : <Footer />}
    </Fragment>
  )
}

export const MarketingDrawer = memo(MarketingDrawerContainer)
