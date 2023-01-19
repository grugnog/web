import { memo, useEffect, useRef, useState } from 'react'
import { WebsiteAnalyticStream } from '@app/components/charts/streams'
import { LazyMount } from '@app/components/lazy/lazymount'
import { Analytic } from '@app/types'

const listHeight = 'h-[295px] md:h-[330px]'

const AnalyticsCardComponent = ({
  domain,
  liveData,
}: {
  domain: string
  liveData: Analytic[]
}) => {
  const [_, setUpdate] = useState<boolean>(false)
  const liveDataClone = useRef<Analytic[]>(liveData)
  const liveDataThrottleTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    if (liveData && liveData.length) {
      liveDataThrottleTimer.current = setTimeout(() => {
        liveDataThrottleTimer.current = undefined
        liveDataClone.current = liveData
        setUpdate((x) => !x)
      }, 500) // todo: set thottle state toggle control
    }

    return () => {
      liveDataThrottleTimer.current &&
        clearTimeout(liveDataThrottleTimer.current)
    }
  }, [liveData, liveDataThrottleTimer, liveDataClone, setUpdate])

  return (
    <div className={`${listHeight} border-t`}>
      <LazyMount className={listHeight} full>
        <WebsiteAnalyticStream
          domain={domain}
          liveData={liveDataClone.current}
        />
      </LazyMount>
    </div>
  )
}

export const AnalyticsCard = memo(AnalyticsCardComponent)
