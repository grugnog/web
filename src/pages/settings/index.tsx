import React, { useState } from 'react'
import { PageTitle, Drawer } from '@app/components/general'
import { userData } from '@app/data'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'

function Settings({ name }: PageProps) {
  const [pageSpeedKey, setPageSpeed] = useState<string>('')
  const {
    settings: data, // user
    loading,
    onConfirmLighthouse,
  } = userData(true, 'settings')

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

  if (!data && !loading) {
    return (
      <div className='px-2'>
        <PageTitle title={'Settings'} />
        <div className='p-4 text-2xl'>
          Authentication required for Settings. Please login to continue.
        </div>
      </div>
    )
  }

  const userPageSpeedKey = data?.user?.pageSpeedApiKey ?? ''

  return (
    <>
      <Drawer title={name}>
        <PageTitle title={'Settings'} />
        <h2 className='text-2xl font-bold'>Core Web Vitals</h2>
        <p>
          Core Web Vitals are a set of speed metrics that are part of{' '}
          {`Google’s`}
          Page Experience signals used to measure user experience.
        </p>
        <p>
          We retrieve them using {`Google’s`} PageSpeed Insights API along with
          our own internal usage. In order to speed of your workflows you can
          add your own key.
        </p>
        <p>{`It’s`} free but limited to a daily quota.</p>
        <div className='py-2'>
          <a
            href={
              'https://help.ahrefs.com/en/articles/5369589-how-to-see-core-web-vitals-and-other-speed-metrics-in-site-audit-tool'
            }
            target={'_blank'}
            rel={'noreferrer'}
            className={'text-blue-600'}
          >
            Learn more
          </a>
        </div>
        <div>
          <h3 className='text-xl'>API Key</h3>
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
      </Drawer>
    </>
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
