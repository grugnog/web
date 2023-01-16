import { Button } from '@app/components/general/buttons'
import { usePageSpeed } from '@app/data/external/pagespeed/results'
import { memo } from 'react'
import { GrView } from 'react-icons/gr'

type CellHeaderProps = {
  url?: string
  setVisible(x: any): void
  visible?: boolean
  totalIssues?: number
  warningCount?: number
  errorCount?: number
  domain: string
  online?: boolean
  pageInsights?: boolean
  duration?: number
  handleMainClick?(data: any, name: string, _mini: boolean, url: string): any
}

const ListCellPagesHeaderW = ({
  url = '',
  setVisible,
  visible,
  online,
  pageInsights,
  duration,
  handleMainClick,
}: CellHeaderProps) => {
  const { getPageSpeed } = usePageSpeed(url, (eventData) => {
    if (handleMainClick) {
      // curry function
      handleMainClick(eventData, 'Lighthouse', false, url)()
    }
  })

  const onTogglelist = () => setVisible((v: boolean) => !v)

  // return a small single row of the page and issues with a dropdown
  return (
    <div className='flex place-items-center text-xs md:text-sm'>
      <button
        className={`px-4 py-3 text-left place-items-center hover:opacity-80 flex-1 max-w-2/3 md:w-auto line-clamp-1 truncate`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${url}`}
      >
        {url}
      </button>
      <div className='grid grid grid-cols-3 gap-5 auto-cols-max pr-4 text-center place-items-center'>
        <div>
          {pageInsights ? (
            <Button iconButton onClick={getPageSpeed}>
              <GrView className='grIcon' />
            </Button>
          ) : (
            'false'
          )}
        </div>
        <div>
          {!!online || typeof online === 'undefined' ? 'true' : 'false'}
        </div>
        <div className='text-right w-14'>
          {duration ? `${duration}ms` : 'N/A'}
        </div>
      </div>
    </div>
  )
}

export const ListCellPagesHeader = memo(ListCellPagesHeaderW)
