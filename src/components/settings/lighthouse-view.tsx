import React from 'react'
import { settingsHeadingStyle } from '@app/styles/headings'
import { Button } from '../general'
import { Header3 } from '../general/header'
import { SiLighthouse } from 'react-icons/si'

export const LighthouseView = ({
  lighthouseVisible,
  onLighthouseToggle,
}: {
  lighthouseVisible: boolean
  onLighthouseToggle(): void
}) => {
  return (
    <div className='py-2 gap-y-2 border-t'>
      <div className='py-3'>
        <div>
          <Header3 className={settingsHeadingStyle}>
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
  )
}
