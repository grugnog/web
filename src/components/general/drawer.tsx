/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { Fragment, memo } from 'react'
import { userData } from '@app/data'
import dynamic from 'next/dynamic'
import { drawerStyles } from '@app/styles/drawer'
import { NavBarTitle, AuthedMenu } from './navigation'
import { SearchBar } from './searchbar'
import { NavBar } from './navbar'
import { FixedCopyRight } from './fixed-copy-right'
import { ConfirmEmail } from '../alerts'
import { Container } from '@material-ui/core'
import { Box } from '@a11ywatch/ui'
import { useWebsiteContext } from '../providers/website'
import { IssueFeed } from '../feed'

const noSSR = {
  ssr: false,
}

const DynamicModal = dynamic(
  () => import('@app/components/modal').then((mod) => mod.DynamicModal) as any,
  noSSR
)

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  noSSR
)

const FormDialog = dynamic(
  () =>
    import('@app/components/general/form-dialog').then(
      (mod) => mod.FormDialog
    ) as any,
  noSSR
)

const MiniPlayer = dynamic(
  () =>
    import('@app/components/general/mini-player').then(
      (mod) => mod.MiniPlayer
    ) as any,
  noSSR
)

function MainDrawerContainer({ route, dataSourceMap, classes }: any) {
  return (
    <div className={`${classes.drawer} hide-print ${classes.drawerPaper}`}>
      <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
      <div className={classes.flex} />
      <div className={'xl:visible invisible p-4'}>
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

  const sidePanelSpaceStyles =
    issueFeed?.data?.length && issueFeed.open ? classes.sidePanelPadding : ''

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
        {user?.loggedIn && !user?.emailConfirmed ? (
          <div className={sidePanelSpaceStyles}>
            <ConfirmEmail sendEmail={sendConfirmEmail} />
          </div>
        ) : null}
        <Container maxWidth={'xl'}>
          <Box className={sidePanelSpaceStyles}>{children}</Box>
        </Container>
        <IssueFeed />
        <MiniPlayer />
        <DynamicModal />
        <UpgradeBanner />
      </main>
    </div>
  )
}

export const Drawer = memo(DrawerComponent)
