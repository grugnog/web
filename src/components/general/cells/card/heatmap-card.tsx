import { memo } from 'react'
import { LazyMount } from '@app/components/lazy/lazymount'
import { Analytic } from '@app/types'
import { HeatMap } from '@app/components/charts/heatmap'

const listHeight = 'h-[295px] md:h-[330px]'

const HeatMapCardComponent = ({
  domain,
  liveData,
}: {
  domain: string
  liveData?: Analytic[]
}) => {
  return (
    <div className={`${listHeight} border-t`}>
      <LazyMount className={listHeight} full>
        <HeatMap domain={domain} liveData={liveData} />
      </LazyMount>
    </div>
  )
}

export const HeatMapCard = memo(HeatMapCardComponent)
