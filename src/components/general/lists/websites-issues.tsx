import React, {
  useState,
  useEffect,
  useCallback,
  memo,
  FC,
  PropsWithChildren,
} from 'react'
import { useMiniPlayer } from '@app/data'
import { defaultModalState, FullScreenModal } from '../fullscreen-modal'
import { listStyle } from '@app/styles/lists/tw'
import { ListCell } from './render/issues/cell'

// list render block main
export const ListComponent: FC<PropsWithChildren<any>> = ({
  data,
  error,
  loading,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  children,
}) => {
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  const handleClickOpen = (data: any, title: any, url: any, error: any) =>
    setOpen({ open: true, data, title, url, error })

  const handleClose = useCallback(() => {
    setOpen(defaultModalState)
  }, [setOpen])

  useEffect(() => {
    if (miniPlayer.open) {
      handleClose()
    }
  }, [miniPlayer, handleClose])

  return (
    <>
      <ul className={listStyle} aria-live='polite'>
        {data?.map((item: any) => (
          <ListCell
            key={item._id}
            item={item}
            loading={loading}
            error={error}
            emptyHeaderTitle={emptyHeaderTitle}
            emptyHeaderSubTitle={emptyHeaderSubTitle}
          />
        ))}
        {children}
      </ul>
      <FullScreenModal
        {...modal}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        refetch={refetch}
        handleClickOpenPlayer={setMiniPlayerContent}
      />
    </>
  )
}

export const List = memo(ListComponent)
