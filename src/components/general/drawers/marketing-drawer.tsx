import React, { Fragment, memo } from 'react'
import { Container } from '@material-ui/core'
import { navigationStyles } from '@app/styles/navigation'
import { strings } from '@app-strings'
import { NavBarTitle, MarketingNavMenu } from '../navigation'
import { SearchBar } from '../searchbar'
import { NavBar } from '../navbar'
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
}: any) {
  const classes = navigationStyles()

  return (
    <Fragment>
      {emptyNav ? null : (
        <NavBar
          position={navPosition}
          marketing
          className={classes.appBar}
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
      <main className={initClosed ? '' : classes.content}>
        {initClosed ? (
          children
        ) : (
          <Container
            maxWidth={maxWidth}
            style={index ? { paddingLeft: 0, paddingRight: 0 } : undefined}
          >
            {children}
          </Container>
        )}
      </main>
      {initClosed || emptyFooter ? null : (
        <Footer footerSpacing={footerSpacing} />
      )}
    </Fragment>
  )
}

export const MarketingDrawer = memo(MarketingDrawerContainer)
