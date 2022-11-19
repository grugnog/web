import { GrClose } from 'react-icons/gr'
import { HomeManager } from '@app/managers'
import { Link } from './link'
import { companyName } from '@app/configs'
import { Button } from './buttons'
import { useEffect, useState } from 'react'

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
      <div className={'py-2 px-3 z-10 w-full flex place-content-around gap-x-2 border rounded transition ease-in-out delay-150'}>
        <div className={'text-sm md:text-normal text-gray-500 font-semibold flex-1'}>
        💵 Fan of {companyName}? <Link href={'https://a11ywatch.getrewardful.com/signup'} style={{ color: '#3b82f6' }}>
          Earn 25% commission
          </Link> for every person you refer to us for 12 months!
        </div>
        <Button onClick={toggle} type={"button"} className={"px-2 border-0"}>
            <GrClose title={"Close reffer banner"} />
        </Button>
      </div>
  ) : null
}

export { RefBanner }
