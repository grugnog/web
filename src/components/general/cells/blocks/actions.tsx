import React from 'react'
import { InfoBlock } from '../info-block'
import { GrAction } from 'react-icons/gr'

export const ActionsBox = ({ actions }: { actions?: string }) => {
  return (
    <InfoBlock title={'Actions'} icon={<GrAction />}>
      {actions ? 'Enabled' : 'N/A'}
    </InfoBlock>
  )
}
