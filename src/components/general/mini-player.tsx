'use client'

import { FC, useMemo } from 'react'
import { Fab } from './fab'
import { Link } from './link'
import { GrClose } from 'react-icons/gr'
import { Lighthouse } from './lighthouse'
import { AdaIframe } from '../ada/ada-iframe'
import { Button } from './buttons'
import { HeadlessModal } from '../modal/headless'
import { useInteractiveContext } from '../providers/interactive'

// a mini modal that appears that can be dragged across the screen.
export const MiniPlayer: FC = () => {
  const { miniPlayer, setMiniPlayerContent } = useInteractiveContext()

  const { open, data, title } = useMemo(() => {
    // parse lighthouse data
    if (miniPlayer && miniPlayer?.title === 'Lighthouse') {
      return {
        ...miniPlayer,
        data: miniPlayer?.data ? JSON.parse(miniPlayer.data) : null,
      }
    }

    return miniPlayer
  }, [miniPlayer])

  const onModalCloseEvent = () => {
    setMiniPlayerContent(false)
  }

  return (
    <HeadlessModal
      open={open}
      onClose={onModalCloseEvent}
      size={'xl'}
      overflow={title !== 'Mini Player'}
    >
      <div>
        <div className='flex w-full py-1.5 px-2  gap-x-2 place-items-center place-content-between border-b'>
          <div className={'flex gap-x-2 place-items-center'}>
            <Button
              iconButton
              onClick={onModalCloseEvent}
              aria-label='close'
              className='text-black hover:text-black'
            >
              <GrClose className='grIcon' />
            </Button>
            <p className='text-lg text-black truncate max-w-[70%]'>{title}</p>
          </div>
          {data && title !== 'Lighthouse' ? (
            <div className='truncate'>
              <Link href={`/website-details?url=${encodeURIComponent(data)}`}>
                {data}
              </Link>
            </div>
          ) : null}
        </div>
        <div className={`w-full h-full`}>
          {title === 'Lighthouse' ? (
            <>
              {data && 'json' in data ? (
                <Lighthouse
                  insight={data}
                  id='fullscreen-lighthouse-report'
                  lighthouseVisible
                />
              ) : (
                <div>Light house data not found.</div>
              )}
            </>
          ) : (
            <div>
              <AdaIframe url={data} miniPlayer />
              <Fab />
            </div>
          )}
        </div>
      </div>
    </HeadlessModal>
  )
}
