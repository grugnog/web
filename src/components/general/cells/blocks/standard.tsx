import React, { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrDocumentTest } from 'react-icons/gr'
import { WCAGSelectInput } from '../../select'
import { useWebsiteContext } from '@app/components/providers/website'
import { AppManager } from '@app/managers'
import { Standard } from '../../select/select-input'
// import { useWebsiteContext } from '@app/components/providers/website'

export const StandardBoxWrapper = ({
  standard: prevStandard,
  url,
}: {
  standard?: keyof typeof Standard
  url: string
}) => {
  const [standard, setStandard] = useState<keyof typeof Standard>(
    prevStandard || 'WCAG2AA'
  )
  const { updateWebsite } = useWebsiteContext()

  const onStandardChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event?.target?.value as keyof typeof Standard
    setStandard(value)

    try {
      await updateWebsite({
        variables: { url, standard: value },
      })
      AppManager.toggleSnack(true, `Updated standard ${url} to ${value}`)
    } catch (e) {
      AppManager.toggleSnack(true, e)
    }
  }

  return (
    <InfoBlock
      title={'Standard'}
      icon={<GrDocumentTest className='grIcon' color='black' fill='black' />}
    >
      <WCAGSelectInput
        standard={standard}
        onStandardChange={onStandardChange}
      />
    </InfoBlock>
  )
}

export const StandardBox = memo(StandardBoxWrapper)
