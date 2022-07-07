import React, { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrPhoneFlip } from 'react-icons/gr'
import { useWebsiteContext } from '@app/components/providers/website'

export const MobileBoxWrapper = ({
  mobile,
  url,
}: {
  mobile?: boolean
  url?: string
}) => {
  const [isMobile, setMobile] = useState<boolean>(!!mobile)
  const { updateWebsite } = useWebsiteContext()

  const onMobileEvent = async () => {
    let nextValue = !isMobile

    setMobile(nextValue)

    try {
      await updateWebsite({
        variables: { url, mobile: nextValue },
      })
    } catch (e) {
      console.error(e)
    }
  }

  const labelId = `${url}-mobile-form`

  return (
    <InfoBlock
      title={'Mobile'}
      icon={<GrPhoneFlip className='grIcon' color='black' fill='black' />}
    >
      <div className='flex space-x-1'>
        <label className='text-sm pb-2 font-medium' htmlFor={labelId}>
          Mobile
        </label>
        <input
          checked={isMobile}
          type='checkbox'
          id={labelId}
          onChange={onMobileEvent}
          name={'mobile_viewport'}
          className={
            'outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
        ></input>
      </div>
      <div>{isMobile ? 'Mobile Viewport' : 'Web Viewport'}</div>
    </InfoBlock>
  )
}

export const MobileBox = memo(MobileBoxWrapper)
