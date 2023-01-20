import { Link } from './link'
import { useAuthContext } from '../providers/auth'

const UpgradeBanner = () => {
  const { account } = useAuthContext()
  const { activeSubscription } = account

  return !activeSubscription ? (
    <div className='hidden md:block'>
      <div className='h-20' />
      <div className={'p-3 z-10 w-full flex place-content-center'}>
        <div className={'text-sm md:text-normal text-gray-600 font-medium'}>
          <Link
            href={'/payments'}
            style={{ color: '#3b82f6', lineHeight: 1 }}
            className={'p-0 text-sm'}
          >
            Upgrade
          </Link>{' '}
          your account to add up to 50 websites, subdomain and TLD monitoring,
          multi page lighthouse reports, and more.
        </div>
      </div>
    </div>
  ) : null
}

export { UpgradeBanner }
