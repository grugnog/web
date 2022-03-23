import React, { memo } from 'react'
import { InfoBlock } from '../info-block'

export const HeadersBoxWrapper = ({
  pageHeaders,
}: {
  pageHeaders?: boolean
}) => {
  return (
    <InfoBlock title={'Headers'}>
      <p>{pageHeaders ? 'Yes' : 'No'}</p>
    </InfoBlock>
  )
}

export const HeadersBox = memo(HeadersBoxWrapper)
