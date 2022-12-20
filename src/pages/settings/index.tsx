import React, { SyntheticEvent, useCallback, useState } from 'react'
import { PageTitle, Drawer, AuthMenu, Button } from '@app/components/general'
import { useFeaturesData, useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useWebsiteContext } from '@app/components/providers/website'
import { GrTrash } from 'react-icons/gr'
import { Header2, Header3 } from '@app/components/general/header'
import { AppManager, UserManager } from '@app/managers'
import { SiLighthouse } from 'react-icons/si'
import { useAuthContext } from '@app/components/providers/auth'
import { NotificationSettings } from '@app/components/stateless/settings/notifications'

const headingStyle =
  'text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium py-2'

function Settings({ name }: PageProps) {
  const [pageSpeedKey, setPageSpeed] = useState<string>('')
  const {
    settings: data, // user
    loading,
    onConfirmLighthouse,
    filterEmailDatesData: filterEmailDates,
    onFilterEmailDates,
  } = useUserData(true, 'settings')

  const { toggleAlert } = useFeaturesData()
  const { account, setAccountType } = useAuthContext()
  const { removeWebsite, setLighthouseVisibility, lighthouseVisible } =
    useWebsiteContext()

  const { alertEnabled, activeSubscription } = account

  const user = data?.user

  const filterEmailDatesData = filterEmailDates ?? user?.emailFilteredDates

  const onRemoveAllWebsitePress = useCallback(async () => {
    if (window.confirm('Are you sure you want to remove all websites?')) {
      try {
        await removeWebsite({
          variables: {
            url: '',
            deleteMany: true,
          },
        })
      } catch (e) {
        console.error(e)
      }
    }
  }, [removeWebsite])

  const onSetLighthouseCode = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setPageSpeed(e.currentTarget.value)
  }

  const onSubmitLighthouse = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e?.preventDefault()

    try {
      await onConfirmLighthouse(pageSpeedKey)
    } catch (e) {
      console.error(e)
    }
  }

  const onLighthouseToggle = useCallback(() => {
    setLighthouseVisibility((visible: boolean) => {
      AppManager.toggleSnack(
        true,
        `Lighthouse display ${!visible ? 'hidden' : 'visible'}`
      )
      return !visible
    })
  }, [setLighthouseVisibility])

  const onAlertToggle = async (e?: SyntheticEvent<HTMLInputElement>) => {
    if (e && typeof e.stopPropagation === 'function') {
      e?.stopPropagation()
    }

    try {
      const nextValue = !alertEnabled
      setAccountType({
        authed: account.authed,
        activeSubscription,
        alertEnabled: nextValue,
        inited: true,
      })
      // todo: remove local storage usage for network + memory
      UserManager.setAlertsEnabled(nextValue)
      await toggleAlert({
        variables: {
          alertEnabled: nextValue,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  if (!data && !loading) {
    return (
      <div className='px-2'>
        <PageTitle
          title={'Settings'}
          rightButton={<AuthMenu authenticated={account.authed} settings />}
        />
        <div className='p-4 text-2xl'>
          Authentication required for Settings. Please login to continue.
        </div>
      </div>
    )
  }

  const userPageSpeedKey = user?.pageSpeedApiKey ?? ''

  return (
    <Drawer title={name}>
      <PageTitle
        title={'Settings'}
        rightButton={<AuthMenu authenticated={account.authed} settings />}
      />
      <Header2 className='sr-only'>
        Configuration to maximize the output for you
      </Header2>
      <div className='flex flex-col gap-y-4'>
        <NotificationSettings
          alertEnabled={alertEnabled}
          onAlertToggle={onAlertToggle}
          filterEmailDatesData={filterEmailDatesData}
          onFilterEmailDates={onFilterEmailDates}
          defaultDayTime={data?.user?.emailMorningOnly}
        />

        <div className='py-2 gap-y-2 border-t'>
          <div className='py-3'>
            <div>
              <Header3 className={headingStyle}>
                Display Lighthouse on Dashboard
              </Header3>
              <p className='text-gray-700 text-sm'>
                Toggle the visibility of lighthouse reports on the dashboard.
              </p>
            </div>
            <div className='pt-2 p-1'>
              <p className='text-gray-800 text-sm'>
                Lighthouse visiblity is{' '}
                <b className='font-medium'>
                  {lighthouseVisible ? 'enabled' : 'disabled'}
                </b>
                .
              </p>
            </div>
          </div>
          <Button
            onClick={onLighthouseToggle}
            className={'flex gap-x-2 place-items-center'}
          >
            Toggle Lighthouse Visibility
            <SiLighthouse className='grIcon' />
          </Button>
        </div>

        <div className='py-2 gap-y-2 border-t'>
          <div>
            <Header3 className={headingStyle}>Core Web Vitals</Header3>
            <p className='text-gray-700'>
              Core Web Vitals are a set of speed metrics that are part of{' '}
              {`Google’s`} Page Experience signals used to measure user
              experience. We retrieve them using PageSpeed Insights API along
              with our own internal usage. In order to speed of your workflows
              you can add your own key. {`It’s`} free but limited to a daily
              quota.
            </p>
            <div className='py-2'>
              <a
                href={'https://developers.google.com/speed'}
                target={'_blank'}
                rel={'noreferrer'}
                className={'text-blue-600'}
              >
                Learn more
              </a>
            </div>
          </div>
          <div>
            <ul className='space-y-2 py-3 list-decimal px-4'>
              <li>
                <a
                  target={'_blank'}
                  rel={'noreferrer'}
                  className={'text-blue-600 p-1'}
                  href={
                    'https://developers.google.com/speed/docs/insights/v5/get-started'
                  }
                >
                  Get a free PageSpeed API key from Google
                </a>
              </li>
              <li className='p-1'>Enter the received code</li>
            </ul>
            <form onSubmit={onSubmitLighthouse}>
              <div>
                <input
                  onChange={onSetLighthouseCode}
                  placeholder='Enter the code'
                  className='p-3 border rounded rounded-r-none'
                  value={pageSpeedKey || userPageSpeedKey}
                ></input>
                <button
                  type={'submit'}
                  disabled={!pageSpeedKey}
                  className={'border p-3 rounded rounded-l-none border-l-0'}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className='py-2 pb-6 gap-y-2 border-t'>
          <div className='py-3'>
            <Header3 className={headingStyle}>Delete all data?</Header3>
            <p className='text-gray-700 text-sm'>
              This will remove all websites and associated data except your
              account.
            </p>
          </div>
          <Button
            onClick={onRemoveAllWebsitePress}
            className={'flex gap-x-2 place-items-center'}
          >
            Delete Data
            <GrTrash className='grIcon' />
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default metaSetter(
  { Settings },
  {
    gql: true,
    description:
      'Settings that you can configure to build custom workflows and enhance your report insight.',
  }
)
