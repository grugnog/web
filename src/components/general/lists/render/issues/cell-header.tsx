import React, { memo } from 'react'

type CellHeaderProps = {
  title?: string
  setVisible(x: any): void
  visible?: boolean
  totalIssues?: number
  small?: boolean
  singleRow?: boolean // display in a single row
}

const ListCellHeaderW = ({
  title = 'N/A',
  setVisible,
  visible,
  totalIssues,
  small,
  singleRow,
}: CellHeaderProps) => {
  const onTogglelist = () => setVisible((v: boolean) => !v)

  // return a small single row of the page and issues with a dropdown
  if (singleRow) {
    return (
      <button
        className={`px-4 py-3 w-full text-left hover:bg-gray-100`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${title}`}
      >
        <div className='flex flex-1 text-xs md:text-sm place-content-around place-items-center'>
          <div className={`text-gray-700 flex-1`}>{title}</div>
          <div>
            <div className={`text-gray-600`}>{totalIssues}</div>
          </div>
        </div>
      </button>
    )
  }

  return (
    <button
      className={`p-3 w-full text-left hover:bg-gray-100`}
      onClick={onTogglelist}
      aria-expanded={visible}
      aria-label={`Toggle section visible for ${title}`}
    >
      <div>
        <div
          className={`${
            small ? 'text-lg md:text-xl' : 'text-2xl md:text-2xl'
          } font-semibold`}
        >
          {title}
        </div>
        <div>
          {totalIssues} possible issue
          {totalIssues === 1 ? '' : 's'}
        </div>
      </div>
    </button>
  )
}

export const ListCellHeader = memo(ListCellHeaderW)
