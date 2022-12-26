import { memo } from 'react'
import { LazyMount } from '@app/components/lazy/lazymount'
import { RenderInnerIssuesPaging } from '../../lists/render/issues/issue-paging'

// issue card paging
const IssueCardCommponent = ({ pageUrl }: { pageUrl: string }) => {
  return (
    <div>
      <div className='flex px-4 py-2 flex-1 w-full place-items-center place-content-end text-gray-500 text-right text-sm border-t border-dotted'>
        <div className='text-right'>Issues</div>
      </div>
      <div className='border-t border-dotted'>
        <LazyMount className={'h-[450px] bg-white'}>
          <RenderInnerIssuesPaging pageUrl={pageUrl} small />
        </LazyMount>
      </div>
    </div>
  )
}

export const IssueCard = memo(IssueCardCommponent)
