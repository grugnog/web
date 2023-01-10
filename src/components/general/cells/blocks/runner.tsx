import { memo } from 'react'
import { InfoBlock } from '../info-block'
import { GrRun } from 'react-icons/gr'
import { useWebsiteContext } from '@app/components/providers/website'
import { RunnerSelect } from '../../runner-select'

export const RunnersBoxWrapper = ({
  url,
  runners,
}: {
  url?: string
  runners?: string[]
}) => {
  const { updateWebsite } = useWebsiteContext()

  const onChangeEvent = async (selected: string[]) => {
    try {
      await updateWebsite({
        variables: { url, runners: selected },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <InfoBlock title={'Runners'} icon={<GrRun className='grIcon' />}>
      <div className='flex space-x-1 place-items-center'>
        <RunnerSelect
          cb={onChangeEvent}
          defaultRunners={
            runners ? runners.map((name, id) => ({ id, name })) : []
          }
        />
      </div>
    </InfoBlock>
  )
}

export const RunnersBox = memo(RunnersBoxWrapper)
