import React, { memo, useState } from 'react'
import { InfoBlock } from '../info-block'
import { GrDocumentTest } from 'react-icons/gr'
// import { useWebsiteContext } from '@app/components/providers/website'

export const StandardBoxWrapper = ({
  standard: prevStandard,
}: {
  standard?: string
}) => {
  const [standard, _setStandard] = useState<string>(prevStandard || 'WCAG2AA')
  //   const { updateWebsite } = useWebsiteContext()

  //   const onMobileEvent = async () => {
  //     let nextValue = !isMobile

  //     setMobile(nextValue)

  //     try {
  //       await updateWebsite({
  //         variables: { url, mobile: nextValue },
  //       })
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   }

  return (
    <InfoBlock
      title={'Standard'}
      icon={<GrDocumentTest className='grIcon' color='black' fill='black' />}
    >
      {/* <div className='flex pb-2 space-x-1'>
        <span className='text-sm font-medium'>MOBILE</span>
        <input
          checked={standard}
          type='checkbox'
          onChange={onMobileEvent}
          className={
            'outline-none relative inline-flex flex-shrink-0 h-4 w-7 rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }
        ></input>
      </div> */}
      <div>{standard}</div>
    </InfoBlock>
  )
}

export const StandardBox = memo(StandardBoxWrapper)
