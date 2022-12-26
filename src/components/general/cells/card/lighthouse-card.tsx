import { memo } from 'react'
import { LazyMount } from '@app/components/lazy/lazymount'
import { PageInsights } from '@app/types'
import { Lighthouse } from '../../lighthouse'

const LighthouseCardComonent = ({
  insight,
  lighthouseVisible,
}: {
  insight?: PageInsights
  lighthouseVisible?: boolean
}) => {
  if (!lighthouseVisible) {
    return null
  }
  return (
    <div className='min-h-[295px] md:min-h-[330px] border-t'>
      <LazyMount className={'min-h-[295px] md:min-h-[330px]'} full>
        <Lighthouse insight={insight} lighthouseVisible />
      </LazyMount>
    </div>
  )
}

export const LighthouseCard = memo(LighthouseCardComonent)
