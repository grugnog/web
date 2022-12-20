import { FC, useState, useCallback, memo } from 'react'
import { CardHeader } from '@app/components/stateless/card/header'
import { ListSkeleton } from '../placeholders'
import { FullScreenModal } from './fullscreen-modal'
import { WebsiteCell } from './cells'
import { Button } from './buttons'
import { UserManager } from '@app/managers'

const emptyClass = 'min-h-10'

function WebSites({
  data,
  removePress,
  handleClickOpen,
  refetch,
  crawlWebsite,
  mutatationLoading,
  loading,
  historyPage,
}: any) {
  return data?.map(
    ({ url, id, pageHeaders, pageUrl, ...domainProps }: any, index: number) => (
      <WebsiteCell
        handleClickOpen={handleClickOpen}
        url={url || pageUrl}
        key={`${id} ${url} ${pageUrl} ${index}`}
        removePress={removePress}
        refetch={refetch}
        crawlWebsite={crawlWebsite}
        loading={loading}
        mutatationLoading={mutatationLoading}
        pageHeaders={pageHeaders}
        index={index}
        historyPage={historyPage}
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

const onLogout = () => {
  UserManager.clearUser()
  window.location.href = '/'
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
  historyPage,
  crawlWebsite,
  setModal,
  mutatationLoading,
  blocked,
}: any) {
  const [modal, setOpen] = useState(defaultModalState)

  const handleClickOpen = useCallback(
    (data: any, title: any, url: any, error: any) => {
      setOpen({ open: true, data, title, url, error })
    },
    [setOpen]
  )

  const handleClose = useCallback(() => {
    setOpen((m) => ({ ...m, open: false }))
  }, [setOpen])

  const generalProps = {
    handleClickOpen,
    removePress,
    refetch,
    historyPage,
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
          subheader='An Issue occurred. Please try again. If issue persist please contact support.'
          className={emptyClass}
        >
          <Button onClick={onLogout}>Logout</Button>
        </CardHeader>
      )
    }
    if (data?.length) {
      return (
        <ul className={`border rounded bg-white`}>
          <WebSites data={data} {...generalProps} />
        </ul>
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
        {historyPage || blocked ? null : (
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
      />
    </>
  )
}

export const List = memo(ListComponent)
