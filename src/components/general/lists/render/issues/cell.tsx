import React, { memo, useState } from 'react'
import { RenderInnerIssues } from './base-list'
import { ListCellHeader } from './cell-header'

// todo: lazy list
export const ListCellW = ({
  item,
  loading,
  error,
  emptyHeaderTitle,
  emptyHeaderSubTitle,
  isVisible = false,
}: any) => {
  const [visible, setVisible] = useState<boolean>(isVisible)

  return (
    <li
      key={item._id}
      className={`border-4 rounded ${visible ? `rounded-b-none` : ''}`}
    >
      <ListCellHeader
        title={item.domain}
        totalIssues={item.issuesInfo?.totalIssues}
        setVisible={setVisible}
        visible={visible}
      />
      <div className={visible ? 'visible' : 'hidden'}>
        <RenderInnerIssues
          data={item}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
          small
        />
      </div>
    </li>
  )
}

export const ListCell = memo(ListCellW)
