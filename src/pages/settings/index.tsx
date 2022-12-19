import React, { useCallback, useState } from 'react'
import { PageTitle, Drawer, AuthMenu, Button } from '@app/components/general'
import { useUserData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { useWebsiteContext } from '@app/components/providers/website'
import { GrTrash } from 'react-icons/gr'
import { Header4 } from '@app/components/general/header'
import { AppManager } from '@app/managers'
import { SiLighthouse } from 'react-icons/si'

function Settings({ name }: PageProps) {
  const [pageSpeedKey, setPageSpeed] = useState<string>('')
  const {
    settings: data, // user
    loading,
    onConfirmLighthouse,
  } = useUserData(true, 'settings')
  const { removeWebsite, setLighthouseVisibility, lighthouseVisible } =
    useWebsiteContext()

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

  if (!data && !loading) {
    return (
      <div className='px-2'>
        <PageTitle
          title={'Settings'}
          rightButton={<AuthMenu authenticated={data?.user} settings />}
        />
        <div className='p-4 text-2xl'>
          Authentication required for Settings. Please login to continue.
        </div>
      </div>
    )
  }

  const userPageSpeedKey = data?.user?.pageSpeedApiKey ?? ''

  return (
    <Drawer title={name}>
      <PageTitle
        title={'Settings'}
        rightButton={<AuthMenu authenticated={data?.user} settings />}
      />
      <div className='flex flex-col gap-y-4'>
        <div>
          <h2 className='text-2xl font-bold'>Core Web Vitals</h2>
          <p>
            Core Web Vitals are a set of speed metrics that are part of{' '}
            {`Google’s`} Page Experience signals used to measure user
            experience.
          </p>
          <p>
            We retrieve them using PageSpeed Insights API along with our own
            internal usage. In order to speed of your workflows you can add your
            own key.
          </p>
          <p>{`It’s`} free but limited to a daily quota.</p>
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
          <div>
            <h3 className='text-xl font-medium'>PageSpeed API Key</h3>
            <ul className='space-y-2 py-3 list-decimal px-4'>
              <li>
                <a
                  target={'_blank'}
                  rel={'noreferrer'}
                  className={'text-blue-600'}
                  href={
                    'https://developers.google.com/speed/docs/insights/v5/get-started'
                  }
                >
                  Get a free API key from Google
                </a>
              </li>
              <li>Enter the received code</li>
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

        <div className='py-2 gap-y-2 border-t'>
          <div className='py-3'>
            <Header4>Display Lighthouse on Dashboard</Header4>
            <p>Toggle the visibility of lighthouse reports on the dashboard.</p>
            <p>
              Lighthouse visiblity is{' '}
              {lighthouseVisible ? 'enabled' : 'disabled'}.
            </p>
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
          <div className='py-3'>
            <Header4>Delete all data?</Header4>
            <p>This will remove all websites and associated data</p>
          </div>
          <Button
            onClick={onRemoveAllWebsitePress}
            className={'flex gap-x-2 place-items-center'}
          >
            Remove All Data
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
