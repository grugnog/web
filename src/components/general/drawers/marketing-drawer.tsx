import { Fragment } from 'react'
import { Container } from '@material-ui/core'
import { navigationStyles } from '@app/styles/navigation'
import { strings } from '@app-strings'
import { NavBarTitle, MarketingNavMenu } from '../navigation'
import { SearchBar } from '../searchbar'
import { NavBar } from '../navigation/navbar'
import { Footer } from '../footer'
import { Link } from '../link'

export function MarketingDrawer({
  children,
  initClosed,
  renderCtaSearch,
  title,
  navPosition,
  maxWidth = 'lg',
  footerSpacing,
  index,
  emptyFooter,
  emptyNav,
  authenticated,
  loading,
}: any) {
  const classes = navigationStyles()
  const padding = index ? 0 : '1rem'

  return (
    <Fragment>
      {emptyNav ? null : (
        <NavBar
          position={navPosition}
          marketing
          className={classes.appBar}
          authenticated={authenticated}
          loading={loading}
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
        className={`pb-10 ${initClosed ? '' : 'pt-1 overflow-hidden'}${
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
