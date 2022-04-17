import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  useMemo,
  memo,
} from 'react'
import { List as MUList, CardHeader } from '@material-ui/core'

import { useMiniPlayer } from '@app/data'
import { ListSkeleton } from '../placeholders'
import { FullScreenModal } from './fullscreen-modal'
import { WebsiteCell, IssuesCell } from './cells'

const emptyClass = 'min-h-10'

function WebSites({
  data,
  removePress,
  handleClickOpen,
  refetch,
  handleClickOpenPlayer,
  errorPage,
  crawlWebsite,
  setModal,
  mutatationLoading,
  loading,
}: any) {
  const source = errorPage ? data?.issues : data

  // TODO: REMOVE DUEL COMPONENTS
  const WebComponent = useMemo(() => (errorPage ? IssuesCell : WebsiteCell), [
    errorPage,
  ])

  return source?.map(
    ({ url, id, pageHeaders, pageUrl, ...domainProps }: any, index: number) => (
      <WebComponent
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
  addPress,
  removePress,
  BottomButton,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  errorPage,
  history,
  crawlWebsite,
  setModal,
  mutatationLoading,
  blocked,
}: any) {
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

  const findIssues = data?.some((source: any) => source?.issues?.length)

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

    const generalProps = {
      handleClickOpen,
      handleClickOpenPlayer: setMiniPlayerContent,
      removePress,
      refetch,
      errorPage,
      history,
      crawlWebsite,
      setModal,
      mutatationLoading: mutatationLoading,
    }

    // ERROR PAGE to display errors ( not actual network error )
    if (
      (errorPage && data?.length && findIssues) ||
      (data?.length && !errorPage)
    ) {
      return (
        <MUList
          className={`border rounded`}
          style={{ paddingTop: 0, paddingBottom: 0 }}
        >
          {!errorPage ? (
            <WebSites data={data} {...generalProps} />
          ) : (
            data.map((page: any, i: number) => (
              <WebSites
                data={page}
                key={`${page.pageUrl} ${i}`}
                {...generalProps}
              />
            ))
          )}
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
        {errorPage || history || blocked ? null : (
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
