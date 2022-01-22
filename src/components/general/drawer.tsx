/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, memo } from 'react'
import dynamic from 'next/dynamic'
import { Box } from '@a11ywatch/ui'
import { Container } from '@material-ui/core'
import { userData } from '@app/data'
import { drawerStyles } from '@app/styles/drawer'
import { NavBarTitle, AuthedMenu } from './navigation'
import { SearchBar } from './searchbar'
import { NavBar } from './navbar'
import { FixedCopyRight } from './fixed-copy-right'
import { ConfirmEmail } from '../alerts'
import { useWebsiteContext } from '../providers/website'
import { IssueFeed } from '../feed'
import { FormDialog } from './form-dialog'
import { DynamicModal } from '../modal'
import { MiniPlayer } from './mini-player'

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  {
    ssr: false,
  }
)

function MainDrawerContainer({ route, dataSourceMap, classes }: any) {
  return (
    <div className={`${classes.drawer} ${classes.drawerPaper} print:hidden`}>
      <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
      <div className={classes.flex} />
      <div
        className={'xl:visible invisible p-4 place-items-center flex-col flex'}
      >
        <FormDialog />
      </div>
      <FixedCopyRight sticky />
    </div>
  )
}

export function DrawerWrapper({
  route: routePath,
  title = '',
  classes,
  dataSourceMap,
}: any) {
  return (
    <Fragment>
      <NavBar
        title={title}
        position='fixed'
        className={`${classes.nav} ${classes.appBar}`}
        toolbar={
          <span className={classes.drawerIconContainer}>
            <NavBarTitle title={title} flex />
            <SearchBar />
          </span>
        }
      />
      <MainDrawerContainer
        route={routePath ?? title}
        dataSourceMap={dataSourceMap}
        classes={classes}
      />
    </Fragment>
  )
}

export function DrawerComponent({
  children,
  route,
  title,
  initClosed,
  bottomButton,
}: any) {
  const classes = drawerStyles()
  const { data: dataSourceMap, sendConfirmEmail } = userData()
  const { issueFeed } = useWebsiteContext()

  const user = dataSourceMap?.user as any

  return (
    <div className={classes.root}>
      <DrawerWrapper
        initClosed={initClosed}
        classes={classes}
        route={route}
        title={title}
        bottomButton={bottomButton}
        dataSourceMap={dataSourceMap}
      />
      <main className={classes.content}>
        <Container maxWidth={'xl'}>
          <Box
            className={
              issueFeed?.data?.length && issueFeed.open
                ? classes.sidePanelPadding
                : ''
            }
          >
            {children}
          </Box>
        </Container>
        <ConfirmEmail
          sendEmail={sendConfirmEmail}
          visible={user?.loggedIn && !user?.emailConfirmed}
        />
        <IssueFeed />
        <MiniPlayer />
        <DynamicModal />
        <UpgradeBanner />
      </main>
    </div>
  )
}

export const Drawer = memo(DrawerComponent)
