import { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrBladesVertical } from 'react-icons/gr'
import { useWebsiteContext } from '@app/components/providers/website'
import { classNames } from '@app/utils/classes'
import { checkBoxStyle } from '@app/styles/checkbox'
import { FormControl } from '../../form-control'

export const SubDomainsBoxWrapper = ({
  subdomains,
  url,
  activeSubscription,
}: {
  subdomains?: boolean
  url?: string
  activeSubscription?: boolean
}) => {
  const [tldEnabled, setTLD] = useState<boolean>(!!subdomains)
  const { updateWebsite } = useWebsiteContext()

  const onChangeEvent = async () => {
    let nextValue = !tldEnabled
    setTLD(nextValue)
    try {
      await updateWebsite({
        variables: { url, subdomains: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-subdomains-form`

  return (
    <InfoBlock
      title={'Subdomains'}
      icon={<GrBladesVertical className='grIcon' />}
    >
      <div className='flex space-x-1 place-items-center'>
        <FormControl htmlFor={labelId} visible disabled={!activeSubscription} className='text-sm font-medium'>
          Subdomains
        </FormControl>

        <input
          checked={tldEnabled}
          type='checkbox'
          id={labelId}
          disabled={!activeSubscription}
          onChange={onChangeEvent}
          name={'subdomains'}
          className={classNames(
            checkBoxStyle,
            activeSubscription ? '' : 'text-gray-200'
          )}
        ></input>
      </div>
      <div>{tldEnabled ? 'Enabled' : 'Disabled'}</div>
    </InfoBlock>
  )
}

export const SubDomainsBox = memo(SubDomainsBoxWrapper)
