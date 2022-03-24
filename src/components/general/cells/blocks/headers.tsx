import React, { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrFlag } from 'react-icons/gr'

export const HeadersBoxWrapper = ({
  pageHeaders,
}: {
  pageHeaders?: boolean
}) => {
  return (
    <InfoBlock title={'Headers'} icon={<GrFlag />}>
      <p>{pageHeaders ? 'Yes' : 'No'}</p>
    </InfoBlock>
  )
}

export const HeadersBox = memo(HeadersBoxWrapper)
