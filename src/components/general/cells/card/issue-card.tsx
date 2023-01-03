import { memo } from 'react'
import { LazyMount } from '@app/components/lazy/lazymount'
import { RenderInnerAnalyticsPaging } from '../../lists/render/issues/analytics-paging'

const PageBar = () => {
  return (
    <div className='flex px-4 py-2 flex-1 w-full place-items-center border-t border-dotted text-xs md:text-sm'>
      <div className='text-left'>Pages</div>
      <div className='flex flex-1 w-full place-content-end text-right'>
        <div className='grid grid grid-cols-2 gap-4'>
          <div>Warnings</div>
          <div>Errors</div>
        </div>
      </div>
    </div>
  )
}

// issue card paging
const IssueCardCommponent = ({ pageUrl }: { pageUrl: string }) => {
  return (
    <div>
      <PageBar />
      <div className='border-t border-dotted'>
        <LazyMount className={'h-[450px]'}>
          <RenderInnerAnalyticsPaging pageUrl={pageUrl} small />
        </LazyMount>
      </div>
    </div>
  )
}

export const IssueCard = memo(IssueCardCommponent)
