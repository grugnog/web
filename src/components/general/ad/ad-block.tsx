import { useAuthContext } from '@app/components/providers/auth'
import Link from 'next/link'
import { memo } from 'react'

// render native ad free accounts
export const AdBlockWrapper = () => {
  const { ads, adIndex } = useAuthContext()
  const adCount = ads.length

  if (adCount) {
    const item = adCount ? ads[adIndex] : null

    if (item) {
      const { title, description, url, imgSrc } = item

      return (
        <Link
          className='px-3 py-2 space-y-2 overflow-hidden bg-gray-800 text-white hidden md:block max-h-[206px]'
          href={url}
          target='_blank'
          passHref
        >
          <div className='h-18'>
            <div className='text-base text-gray-200 line-clamp-2'>{title}</div>
            <p className='text-sm text-gray-300 line-clamp-3'>{description}</p>
          </div>
          <img
            src={imgSrc}
            width={630}
            height={1200}
            alt={description}
            className={'shadow rounded w-full'}
          />
        </Link>
      )
    }
  }

  return null
}

export const AdBlock = memo(AdBlockWrapper)
