import { useEffect, useState } from 'react'
import { GrClose } from 'react-icons/gr'
import { HomeManager } from '@app/managers'
import { companyName } from '@app/configs'
import { Link } from './link'
import { Button } from './buttons'

const RefBanner = () => {
  const [isClosed, setClosed] = useState<boolean>(true)

  useEffect(() => {
    setClosed(HomeManager.refClosed)
  }, [setClosed])

  const toggle = () => {
    setClosed((x: boolean) => !x)
    HomeManager.toggleRef()
  }

  return !isClosed ? (
    <div className='pt-2'>
      <div
        className={
          'py-2 px-3 z-10 w-full flex place-items-center place-content-around gap-x-2 border rounded transition ease-in-out delay-150'
        }
      >
        <div className={'text-sm text-gray-600 font-semibold flex-1'}>
          💵 Fan of {companyName}?{' '}
          <Link
            href={'https://a11ywatch.getrewardful.com/signup'}
            style={{ color: '#3b82f6' }}
            target='_blank'
            className={'text-sm md:text-sm'}
          >
            Earn 25% commission
          </Link>{' '}
          for every person you refer to us forever!
        </div>
        <Button onClick={toggle} type={'button'} className={'px-2 border-0'}>
          <GrClose title={'Close referrer banner'} />
        </Button>
      </div>
    </div>
  ) : null
}

export { RefBanner }
