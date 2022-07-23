import { memo } from 'react'
import { GrDown, GrSync, GrUp } from 'react-icons/gr'
import { IssueTitle } from './title'
import type { FeedComponentProps } from './interface'

// heading block for feed entry displaying website title that can toggle parent list.
export const FeedHeadingComponent = ({
  onToggleSection,
  onScanEvent,
  domain,
  pageUrl,
  sectionHidden,
  totalIssues,
}: Partial<FeedComponentProps> & {
  onToggleSection(x: (x: boolean) => boolean): void
  sectionHidden?: boolean
  domain: string
  pageUrl: string
  totalIssues: number
}) => {
  const onScan = async () => {
    try {
      onScanEvent && (await onScanEvent(pageUrl))
    } catch (e) {
      console.error(e)
    }
  }

  const onToggle = () => {
    onToggleSection((v: boolean) => !v)
  }

  return (
    <div className='flex pl-2 space-x-1  border border-x-0 border-t-0 h-15'>
      <div className='flex-1 px-2 py-2 truncate space-y-1'>
        <IssueTitle pageUrl={pageUrl} domain={domain} />
        <div className='text-sm text-[#707070]'>
          {totalIssues} issue{totalIssues === 1 ? '' : 's'}
        </div>
      </div>
      <div className='flex'>
        {onScanEvent ? (
          <button
            onClick={onScan}
            title={`Scan ${pageUrl} and sync`}
            className='px-5 py-1 hover:bg-blue-50'
          >
            <GrSync className={'text-base grIcon'} />
          </button>
        ) : null}
        <button
          onClick={onToggle}
          className='px-5 py-1 hover:bg-gray-50'
          title={`Toggle issues ${
            sectionHidden ? 'visible' : 'hidden'
          } for ${pageUrl}`}
        >
          {sectionHidden ? (
            <GrDown className={'text-base grIcon'} />
          ) : (
            <GrUp className={'text-base grIcon'} />
          )}
        </button>
      </div>
    </div>
  )
}

export const FeedHeading = memo(FeedHeadingComponent)
