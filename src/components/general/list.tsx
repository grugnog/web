import React, { FC, useState, useEffect, useCallback, memo } from 'react'
import { List as MUList, CardHeader } from '@material-ui/core'

import { useMiniPlayer } from '@app/data'
import { ListSkeleton } from '../placeholders'
import { FullScreenModal } from './fullscreen-modal'
import { WebsiteCell } from './cells'

const emptyClass = 'min-h-10'

function WebSites({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
  history,
}: any) {
  return data?.map(
    ({ url, id, pageHeaders, pageUrl, ...domainProps }: any, index: number) => (
      <WebsiteCell
        handleClickOpen={handleClickOpen}
        url={url || pageUrl}
        key={`${id} ${url} ${pageUrl} ${index}`}
        removePress={removePress}
        refetch={refetch}
        handleClickOpenPlayer={handleClickOpenPlayer}
        crawlWebsite={crawlWebsite}
        setModal={setModal}
        loading={loading}
        mutatationLoading={mutatationLoading}
        pageHeaders={pageHeaders}
        index={index}
        history={history}
        {...domainProps}
      />
    )
  )
}

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

// TODO: remove for central history component
export function ListComponent({
  data,
  error,
  loading,
  addPress,
  removePress,
  BottomButton,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  history,
  crawlWebsite,
  setModal,
  mutatationLoading,
  blocked,
}: any) {
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  const handleClickOpen = useCallback(
    (data: any, title: any, url: any, error: any) => {
      setOpen({ open: true, data, title, url, error })
    },
    [setOpen]
  )

  const handleClose = useCallback(() => {
    setOpen((m) => ({ ...m, open: false }))
  }, [setOpen])

  useEffect(() => {
    if (miniPlayer.open) {
      handleClose()
    }
  }, [miniPlayer, handleClose])

  const generalProps = {
    handleClickOpen,
    handleClickOpenPlayer: setMiniPlayerContent,
    removePress,
    refetch,
    history,
    crawlWebsite,
    setModal,
    mutatationLoading: mutatationLoading,
    errorPage: true,
  }

  // TODO: MOVE OUTSIDE COMPONENT
  const RenderInner: FC = () => {
    if (!data?.length && loading) {
      return <ListSkeleton />
    }
    if (!data.length && !loading && error) {
      return (
        <CardHeader
          title='Error'
          subheader='An Issue occured. Please try again. If issue persist please contact support.'
          className={emptyClass}
        />
      )
    }

    // ERROR PAGE to display errors ( not actual network error )
    if (data?.length) {
      return (
        <MUList
          className={`border rounded`}
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          <WebSites data={data} {...generalProps} />
        </MUList>
      )
    }

    return (
      <CardHeader
        title={emptyHeaderTitle}
        subheader={emptyHeaderSubTitle}
        className={emptyClass}
      />
    )
  }

  return (
    <>
      <div>
        <RenderInner />
        {history || blocked ? null : (
          <BottomButton
            buttonTitle={data?.length ? undefined : 'Lets start!'}
            okPress={addPress}
          />
        )}
      </div>
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
