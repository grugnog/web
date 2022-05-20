import React, { FC, useState, useEffect, useCallback, memo } from 'react'
import { List as MUList, CardHeader } from '@material-ui/core'

import { useMiniPlayer } from '@app/data'
import { ListSkeleton } from '../../placeholders'
import { FullScreenModal } from '../fullscreen-modal'
import { IssuesCell } from '../cells'

const emptyClass = 'min-h-10'

// return issues maped
function IssuesWrapper({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
}: any) {
  const source = data?.issues

  return source?.map(
    ({ url, id, pageHeaders, pageUrl, ...domainProps }: any, index: number) => (
      <IssuesCell
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
        {...domainProps}
      />
    )
  )
}

// memo expensive issues
const Issues = memo(IssuesWrapper)

const RenderInner: FC<any> = (props) => {
  const {
    data,
    loading,
    findIssues,
    generalProps,
    error,
    emptyHeaderTitle,
    emptyHeaderSubTitle,
  } = props

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
  if (data?.length && findIssues) {
    return (
      <MUList
        className={`border rounded`}
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        {data.map((page: any, i: number) => (
          <Issues data={page} key={`${page.pageUrl} ${i}`} {...generalProps} />
        ))}
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

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

export function ListComponent({
  data,
  error,
  loading,
  removePress,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  history,
  crawlWebsite,
  setModal,
  mutatationLoading,
}: any) {
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  // the page contains valid issues
  const findIssues = data?.some((source: any) => source?.issues?.length)

  const handleClickOpen = (data: any, title: any, url: any, error: any) => {
    setOpen({ open: true, data, title, url, error })
  }

  const handleClose = useCallback(() => {
    setOpen(defaultModalState)
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
  }

  return (
    <>
      <RenderInner
        data={data}
        loading={loading}
        error={error}
        emptyHeaderTitle={emptyHeaderTitle}
        emptyHeaderSubTitle={emptyHeaderSubTitle}
        findIssues={findIssues}
        generalProps={generalProps}
      />
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
