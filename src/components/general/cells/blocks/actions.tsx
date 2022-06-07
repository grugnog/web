import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrAction } from 'react-icons/gr'

export const ActionsBoxWrapper = ({ actions }: { actions?: string }) => {
  return (
    <InfoBlock title={'Actions'} icon={<GrAction />}>
      <p>{actions ? 'Enabled' : 'N/A'}</p>
    </InfoBlock>
  )
}

export const ActionsBox = memo(ActionsBoxWrapper)
