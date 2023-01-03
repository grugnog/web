import { memo } from 'react'
import { WebsiteAnalyticStream } from '@app/components/charts/streams'
import { LazyMount } from '@app/components/lazy/lazymount'
import { Analytic } from '@app/types'

const listHeight = 'h-[295px] md:h-[330px]'

const AnalyticsCardComponent = ({
  domain,
  activeSubscription,
  liveData,
}: {
  activeSubscription: boolean
  domain: string
  liveData?: Analytic[]
}) => {
  if (!activeSubscription) {
    return null
  }

  return (
    <div className={`${listHeight} border-t`}>
      <LazyMount className={listHeight} full>
        <WebsiteAnalyticStream domain={domain} liveData={liveData} />
      </LazyMount>
    </div>
  )
}

export const AnalyticsCard = memo(AnalyticsCardComponent)
