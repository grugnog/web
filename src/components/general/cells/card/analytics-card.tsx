import { memo } from 'react'
import { WebsiteAnalyticStream } from '@app/components/charts/streams'
import { LazyMount } from '@app/components/lazy/lazymount'

const AnalyticsCardComponent = ({
  domain,
  activeSubscription,
}: {
  activeSubscription: boolean
  domain: string
}) => {
  if (!activeSubscription) {
    return null
  }
  return (
    <div className='h-[295px] md:h-[330px] border-t'>
      <LazyMount className={'h-[295px] md:h-[330px]'} full>
        <WebsiteAnalyticStream domain={domain} />
      </LazyMount>
    </div>
  )
}

export const AnalyticsCard = memo(AnalyticsCardComponent)
