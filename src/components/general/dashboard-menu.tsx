import React from 'react'
import { AuthMenu, Button, FormDialog } from '@app/components/general'
import { _ONBOARDED } from '@app/lib/cookies/names'
import {
  GrConnect,
  GrDocumentTest,
  GrLineChart,
  GrSort,
  GrTrash,
} from 'react-icons/gr'
import { SiLighthouse } from 'react-icons/si'

// right bar
export type RightBarProps = {
  onRemoveAllWebsitePress(x: any): void
  onQueryEvent(x: any): void
  onScanAllEvent?(x: any): void // scan all websites
  onLighthouseToggle(x: any): void
  onWebsiteSort(x: any): void
  onAnalyticsEvent(): void
  lighthouseVisible?: boolean
  lhEnabled?: boolean
  queryModalVisible?: boolean
  sortModalVisible?: boolean
  sortCapable?: boolean
}

const btnStyles = 'gap-x-1.5 flex place-items-center'

export const RightBar = ({
  onWebsiteSort,
  sortCapable,
  onRemoveAllWebsitePress,
  onQueryEvent,
  onScanAllEvent,
  queryModalVisible,
  lhEnabled,
  onLighthouseToggle,
  lighthouseVisible,
  sortModalVisible,
  onAnalyticsEvent,
}: RightBarProps) => {
  return (
    <div className='flex flex-wrap gap-x-2 gap-y-1 text-sm'>
      <Button onClick={onRemoveAllWebsitePress} className={btnStyles}>
        Delete All
        <GrTrash className='grIcon' />
      </Button>
      <Button
        onClick={onQueryEvent}
        className={`${btnStyles}${queryModalVisible ? ' border-blue-800' : ''}`}
      >
        Scan
        <GrDocumentTest className='grIcon' />
      </Button>
      <Button
        className={`${btnStyles}${lhEnabled ? ' visible' : ' hidden'}${
          lighthouseVisible ? '' : ' bg-gray-200'
        }`}
        onClick={onLighthouseToggle}
        aria-expanded={lighthouseVisible}
        aria-label={'Toggle lighthouse reports visibility.'}
      >
        Lighthouse
        <SiLighthouse className='grIcon' />
      </Button>
      {onScanAllEvent ? (
        <Button onClick={onScanAllEvent} className={btnStyles}>
          Sync All <GrConnect className='grIcon' />
        </Button>
      ) : null}

      {sortCapable ? (
        <>
          <Button onClick={onAnalyticsEvent} className={btnStyles}>
            Analytics
            <GrLineChart className='grIcon' />
          </Button>
          <Button
            onClick={onWebsiteSort}
            className={`${btnStyles}${
              sortModalVisible ? ' border-blue-800' : ''
            }`}
          >
            Sort
            <GrSort className='grIcon' />
          </Button>
        </>
      ) : null}
      <FormDialog buttonTitle={`Subscribe`} icon buttonStyles={btnStyles} />
      <AuthMenu authenticated settings />
    </div>
  )
}
