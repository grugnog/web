import React from 'react'
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

function MainDrawerContainer({ route, dataSourceMap, classes }: any) {
  return (
    <div
      className={`${classes.drawer} ${classes.drawerPaper} relative print:hidden overflow-hidden`}
    >
      <div className='fixed flex flex-col w-[inherit] overflow-hidden h-full bg-lightgray border-r z-10'>
        <AuthedMenu dataSourceMap={dataSourceMap} route={route} />
        <div
          className={
            'xl:visible invisible p-4 place-items-center flex-col flex flex-1'
          }
        >
          <FormDialog buttonStyles={'w-full bg-gray-50'} />
        </div>
        <UpgradeBanner />
        <div className='invisible md:visible w-full flex place-content-center py-2 truncate'>
          <FixedCopyRight />
        </div>
      </div>
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
    <MainDrawerContainer
      route={routePath ?? title}
      dataSourceMap={dataSourceMap}
      classes={classes}
    />
  )
}

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

export function Drawer({ children, route, title }: any) {
  const classes = drawerStyles()
  const { data: dataSourceMap, sendConfirmEmail } = useUserData()
  const { authed } = useAuthContext()

  const user = dataSourceMap?.user as any

  return (
    <>
      <Head>
        <style>
          {`html {
          overflow: hidden;
        }
        .scrollbar::-webkit-scrollbar {
          width: 12px;
        }
      
      .scrollbar::-webkit-scrollbar-track {
          border-radius: 100vh;
          background: #f2f4f7;
      }
      
      .scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 100vh;
          border: 2px solid #ebedf2;
      }
        `}
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
          <div className={'pr-2 md:pr-4 pl-2 md:pl-8 lg:pl-8 lg:pr-8 pt-2'}>
            {children}
          </div>
          <ConfirmEmail
            sendEmail={sendConfirmEmail}
            visible={user?.loggedIn && !user?.emailConfirmed}
          />
          <MiniPlayer />
          <DynamicModal />
        </main>
        <IssueFeed />
      </div>
    </>
  )
}
