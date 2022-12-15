import { memo } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useUserData } from '@app/data'
import { UpgradeBanner } from '@app/components/general/upgrade-banner'
import { useAuthContext } from '@app/components/providers/auth'
import { AuthedMenu } from '../navigation'
import { NavBar } from '../navigation/navbar'
import { FixedCopyRight } from '../fixed-copy-right'
import { ConfirmEmail } from '../../alerts'
import { IssueFeed } from '../../feed'
import { FormDialog } from '../form-dialog'
import { SearchBar } from '../searchbar'
import { MiniPlayer } from '../mini-player'
import { RefBanner } from '../ref-banner'

const DynamicModal = dynamic(() =>
  import('../../modal/dynamic').then((mod) => mod.DynamicModal)
)

export type DrawerWrapperProps = {
  route?: string
  title?: string
  dataSourceMap: any
}

function MainDrawerContainerComponent({
  route,
  dataSourceMap,
}: DrawerWrapperProps) {
  return (
    <div
      className={`flex flex-col overflow-x-hidden w-[55px] sm:w-[15vw] md:w-[18vw] lg:w-[250px] max-w-[250px] relative print:hidden overflow-hidden`}
    >
      <div className='fixed flex flex-col w-[inherit] overflow-hidden h-full bg-lightgray z-10 space-y-3'>
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

export const MainDrawerContainer = memo(MainDrawerContainerComponent)

export function DrawerWrapperComponent({
  route: routePath,
  title = '',
  dataSourceMap,
}: DrawerWrapperProps) {
  return (
    <MainDrawerContainer
      route={routePath ?? title}
      dataSourceMap={dataSourceMap}
    />
  )
}

export const DrawerWrapper = memo(DrawerWrapperComponent)

export function NavigationBar({ title = '', authenticated }: any) {
  return (
    <NavBar authenticated={authenticated} title={title}>
      <span className={'flex flex-1 place-content-end'}>
        <SearchBar />
      </span>
    </NavBar>
  )
}

export function DrawerW({ children, route, title }: any) {
  const { data: dataSourceMap, sendConfirmEmail } = useUserData()
  const { authed } = useAuthContext()

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
      <>
        <div className={'flex overflow-x-inherit md:overflow-x-hidden'}>
          <DrawerWrapper
            route={route}
            title={title}
            dataSourceMap={dataSourceMap}
          />
          <main className={'flex-1 overflow-auto'} id='main-content'>
            <NavigationBar title={title} authenticated={authed} />
            <div
              style={{
                maxHeight: `calc(100vh - 55px)`,
              }}
              className={'px-3 md:px-4 pt-2 scrollbar overflow-auto'}
            >
              <RefBanner />
              {children}
            </div>
            <ConfirmEmail
              sendEmail={sendConfirmEmail}
              visible={!!user?.loggedIn && !user?.emailConfirmed}
            />
          </main>
          <IssueFeed />
        </div>
        <DynamicModal />
        <MiniPlayer />
      </>
    </>
  )
}

export const Drawer = memo(DrawerW)
