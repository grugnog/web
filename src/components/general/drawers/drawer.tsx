import React, { memo, useEffect } from 'react'
import { useUserData } from '@app/data'
import { UpgradeBanner } from '@app/components/general/upgrade-banner'
import { useAuthContext } from '@app/components/providers/auth'
import { drawerStyles } from '@app/styles/drawer'
import { AuthedMenu } from '../navigation'
import { NavBar } from '../navigation/navbar'
import { FixedCopyRight } from '../fixed-copy-right'
import { ConfirmEmail } from '../../alerts'
import { IssueFeed } from '../../feed'
import { FormDialog } from '../form-dialog'
import { SearchBar } from '../searchbar'
import { DynamicModal } from '../../modal/dynamic'
import { MiniPlayer } from '../mini-player'
import Head from 'next/head'
import { theme } from '@app/theme'
import { AdBlock } from '../ad/ad-block'
import { RefBanner } from '../ref-banner'

export type DrawerWrapperProps = {
  route?: string
  title?: string
  classes: Record<string, unknown>
  dataSourceMap: any
}

function MainDrawerContainerComponent({
  route,
  dataSourceMap,
  classes,
}: DrawerWrapperProps) {
  return (
    <div
      className={`${classes.drawer} ${classes.drawerPaper} relative print:hidden overflow-hidden`}
    >
      <div className='fixed flex flex-col w-[inherit] overflow-hidden h-full bg-lightgray border-r z-10 space-y-3'>
        <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
        <div
          className={
            'xl:visible invisible p-4 place-items-center flex-col flex flex-1'
          }
        >
          <FormDialog buttonStyles={'w-full bg-gray-50'} />
        </div>
        <AdBlock />
        <UpgradeBanner />
        <div className='invisible md:visible w-full flex place-content-center py-2 truncate'>
          <FixedCopyRight />
        </div>
      </div>
    </div>
  )
}

export const MainDrawerContainer = memo(MainDrawerContainerComponent)

export function DrawerWrapperComponent({
  route: routePath,
  title = '',
  classes,
  dataSourceMap,
}: DrawerWrapperProps) {
  return (
    <MainDrawerContainer
      route={routePath ?? title}
      dataSourceMap={dataSourceMap}
      classes={classes}
    />
  )
}

export const DrawerWrapper = memo(DrawerWrapperComponent)

export function NavigationBar({ title = '', classes, authenticated }: any) {
  return (
    <NavBar authenticated={authenticated} title={title}>
      <span className={classes.drawerIconContainer}>
        <span className='flex flex-1' />
        <SearchBar />
      </span>
    </NavBar>
  )
}

export function DrawerW({ children, route, title }: any) {
  const classes = drawerStyles()
  const { data: dataSourceMap, sendConfirmEmail } = useUserData()
  const { authed, setRandomIndex } = useAuthContext()

  useEffect(() => {
    if (title) {
      setRandomIndex()
    }
  }, [title, setRandomIndex])

  const user = dataSourceMap?.user

  return (
    <>
      <Head>
        <style>
          {`html { overflow: hidden; }
.scrollbar::-webkit-scrollbar { width: 12px; }
.scrollbar::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #f2f4f7;
}
.scrollbar::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
    border: 2px solid #ebedf2;
}
@media (any-pointer: coarse) {
  ul a {
    padding:inherit;
  }
}`}
        </style>
      </Head>
      <div className={'flex overflow-x-inherit md:overflow-x-hidden'}>
        <DrawerWrapper
          classes={classes}
          route={route}
          title={title}
          dataSourceMap={dataSourceMap}
        />
        <main className={classes.content} id='main-content'>
          <NavigationBar
            classes={classes}
            title={title}
            authenticated={authed}
          />
          <div
            style={{
              maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
            }}
            className={
              'px-4 md:pr-4 md:pl-8 lg:pl-8 lg:pr-4 pt-2 scrollbar overflow-auto'
            }
          >
            <RefBanner />
            {children}
          </div>
          <ConfirmEmail
            sendEmail={sendConfirmEmail}
            visible={!!user?.loggedIn && !user?.emailConfirmed}
          />
          <MiniPlayer />
          <DynamicModal />
        </main>
        <IssueFeed />
      </div>
    </>
  )
}

export const Drawer = memo(DrawerW)
