import React, { Fragment, memo } from 'react'
import dynamic from 'next/dynamic'
import { userData } from '@app/data'
import { drawerStyles } from '@app/styles/drawer'
import { NavBarTitle, AuthedMenu } from '../navigation'
import { SearchBar } from '../searchbar'
import { NavBar } from '../navbar'
import { FixedCopyRight } from '../fixed-copy-right'
import { ConfirmEmail } from '../../alerts'
import { useWebsiteContext } from '../../providers/website'
import { IssueFeed } from '../../feed'
import { FormDialog } from '../form-dialog'
import { DynamicModal } from '../../modal'
import { MiniPlayer } from '../mini-player'

const UpgradeBanner = dynamic(
  () =>
    import('@app/components/general/upgrade-banner').then(
      (mod) => mod.UpgradeBanner
    ) as any,
  {
    ssr: false,
  }
)

function MainDrawerContainerComponent({ route, dataSourceMap, classes }: any) {
  return (
    <div className={`${classes.drawer} ${classes.drawerPaper} print:hidden`}>
      <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
      <div className={classes.flex} />
      <div
        className={'xl:visible invisible p-4 place-items-center flex-col flex'}
      >
        <FormDialog />
      </div>
      <UpgradeBanner />
      <FixedCopyRight sticky />
    </div>
  )
}

const MainDrawerContainer = memo(MainDrawerContainerComponent)

export function DrawerWrapperComponent({
  route: routePath,
  title = '',
  classes,
  dataSourceMap,
  sidePannelStyles,
}: any) {
  return (
    <Fragment>
      <NavBar
        title={title}
        position='fixed'
        className={`${classes.nav} ${classes.appBar} ${sidePannelStyles}`}
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

const DrawerWrapper = memo(DrawerWrapperComponent)

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

  const sidePannelStyles = `${
    issueFeed?.data?.length && issueFeed.open
      ? `${classes.sidePanelPadding}`
      : ''
  }`

  return (
    <div className={classes.root}>
      <DrawerWrapper
        initClosed={initClosed}
        classes={classes}
        route={route}
        title={title}
        bottomButton={bottomButton}
        dataSourceMap={dataSourceMap}
        sidePannelStyles={sidePannelStyles}
      />
      <main className={classes.content}>
        <div className={sidePannelStyles}>
          <div className={'pr-8 lg:pl-8 md:pl-8'}>{children}</div>
        </div>
        <ConfirmEmail
          sendEmail={sendConfirmEmail}
          visible={user?.loggedIn && !user?.emailConfirmed}
        />
        <IssueFeed />
        <MiniPlayer />
        <DynamicModal />
      </main>
    </div>
  )
}

export const Drawer = memo(DrawerComponent)
