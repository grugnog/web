import React from 'react'
import { Button, FormDialog } from '@app/components/general'
import { _ONBOARDED } from '@app/lib/cookies/names'

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
      <Button
        onClick={onRemoveAllWebsitePress}
        aria-label={'Remove all websites'}
      >
        Remove All
      </Button>
      <Button
        onClick={onQueryEvent}
        className={queryModalVisible ? 'border-blue-800' : ''}
      >
        Scan
      </Button>
      <Button
        className={lhEnabled ? 'visible' : 'hidden'}
        onClick={onLighthouseToggle}
        aria-expanded={lighthouseVisible}
        aria-label={'Toggle lighthouse reports visibility.'}
      >
        {lighthouseVisible ? 'Hide' : 'Display'} Lighthouse
      </Button>
      {onScanAllEvent ? (
        <Button onClick={onScanAllEvent}>Sync All</Button>
      ) : null}

      {sortCapable ? (
        <>
          <Button
            onClick={onAnalyticsEvent}
            className={sortModalVisible ? 'border-blue-800' : ''}
          >
            Analytics
          </Button>
          <Button
            onClick={onWebsiteSort}
            className={sortModalVisible ? 'border-blue-800' : ''}
          >
            {sortModalVisible ? 'Toggle Sort' : 'Sort Websites'}
          </Button>
        </>
      ) : null}
      <FormDialog buttonTitle={`Subscribe`} />
    </div>
  )
}
