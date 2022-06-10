import React, { useState } from 'react'
import { Typography } from '@material-ui/core'
import { MarketingDrawer, PageTitle } from '@app/components/general'
import { strings } from '@app-strings'
import { metaSetter } from '@app/utils'
import type { PageProps } from '@app/types'
import { companyName } from '@app/configs'

// calc the basic cost of the plan
const calcCost = ({ websiteCount, apiCount, siteWideApiCount }: any) => {
  let total = 0

  if (websiteCount) {
    // todo use % by to get value
    if (websiteCount <= 8) {
      total = websiteCount * 1.75
    } else if (websiteCount <= 20) {
      total = websiteCount * 1.7
    } else if (websiteCount <= 30) {
      total = websiteCount * 1.65
    } else if (websiteCount <= 40) {
      total = websiteCount * 1.6
    } else if (websiteCount <= 50) {
      total = websiteCount * 1.5
    } else if (websiteCount <= 60) {
      total = websiteCount * 1.4
    } else if (websiteCount <= 70) {
      total = websiteCount * 1.3
    } else if (websiteCount <= 80) {
      total = websiteCount * 1.2
    } else if (websiteCount <= 90) {
      total = websiteCount * 1.1
    } else if (websiteCount >= 100) {
      total = websiteCount * 1 // flat
    }
  }

  if (apiCount) {
    const apiBaseToDollar = Number(Math.round(apiCount / 500)) // per dollar
    total = total + apiBaseToDollar
  }

  if (siteWideApiCount) {
    const apiBaseToDollar = Number(Math.round(apiCount / 100)) // per dollar
    total = total + apiBaseToDollar
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(total ? total - 0.01 : 0)
}

function CreateCalculator({ name }: PageProps) {
  const [websiteCount, setWebsiteCount] = useState<number>(8)
  const [apiCount, setApiCount] = useState<number>(500)
  const [siteWideApiCount, setSiteWideApiCount] = useState<number>(100)

  const mountlyCost = calcCost({ websiteCount, apiCount, siteWideApiCount })

  const onSetWebsiteCount = (event: React.ChangeEvent<any>) => {
    setWebsiteCount(event.target.value)
  }

  const onSetApiCount = (event: React.ChangeEvent<any>) => {
    setApiCount(event.target.value)
  }

  const onSetSiteWideApiCount = (event: React.ChangeEvent<any>) => {
    setSiteWideApiCount(event.target.value)
  }

  return (
    <MarketingDrawer title={name} footerSpacing>
      <PageTitle>Calculate the plan cost</PageTitle>
      <Typography variant='subtitle1' component='p'>
        See estimates on enterprise plans at the basic entry of scale.
      </Typography>
      <div className='space-y-4 py-2'>
        <div className='py-4 space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='website-count' className='block font-bold'>
              Websites
            </label>
            <input
              type='number'
              placeholder='Number of websites'
              className='px-5 py-3 border rounded'
              id={'website-count'}
              name={'website_count'}
              value={websiteCount}
              onChange={onSetWebsiteCount}
              min={10}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='api-calls' className='block font-bold'>
              Daily Standard API calls
            </label>
            <input
              type='number'
              placeholder='API calls'
              className='px-5 py-3 border rounded'
              id={'api-calls'}
              name={'api_count'}
              value={apiCount}
              min={500}
              onChange={onSetApiCount}
            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='api-calls-sitewide' className='block font-bold'>
              Daily Site wide scans
            </label>
            <input
              type='number'
              placeholder='Site wide API calls'
              className='px-5 py-3 border rounded'
              id={'api-calls-sitewide'}
              min={100}
              value={siteWideApiCount}
              onChange={onSetSiteWideApiCount}
            />
          </div>
        </div>
        <div className='py-4 px-4 border-t'>
          <p className='text-xl'>{companyName} enterprise estimate</p>
          <div className='flex space-x-3 place-content-between place-items-center'>
            <b className='text-lg'>Total monthly cost:</b>
            <p className='text-4xl font-bold'>{mountlyCost}</p>
          </div>
        </div>
      </div>
    </MarketingDrawer>
  )
}

export default metaSetter(
  { CreateCalculator },
  {
    description: `Calculator for enterprise plans at ${strings.appName}.`,
    intercom: true,
  }
)
