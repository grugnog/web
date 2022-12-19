import { FC, useState, useEffect, useCallback, memo } from 'react'
import { useMiniPlayer } from '@app/data'
import { usePagesData } from '@app/data/external/pages/pages'
import { FullScreenModal } from '../fullscreen-modal'
import { WebsiteCellPages } from '../cells'
import { InnerWrapper } from './list-wrapper'
import { LoadMoreButton } from '../buttons'
import { listStyle } from '@app/styles/lists/tw'

export const RenderInnerPages: FC<any> = (props) => {
  const { pageUrl, generalProps } = props
  const { data: pagesSource, loading, onLoadMorePages } = usePagesData(pageUrl)

  return (
    <>
      <InnerWrapper
        {...props}
        data={pagesSource?.length}
        loading={loading}
        generalProps={generalProps}
      >
        <ul className='list-none'>
          {pagesSource?.map((page: any) => (
            <WebsiteCellPages key={page._id} {...page} {...generalProps} />
          ))}
        </ul>
      </InnerWrapper>
      <div className={`pb-8 ${pagesSource?.length > 1 ? '' : 'hidden'}`}>
        <LoadMoreButton
          visible={pagesSource?.length > 1}
          onLoadMoreEvent={onLoadMorePages}
          title={'Load more pages'}
        />
      </div>
    </>
  )
}

const defaultModalState = {
  open: false,
  data: null,
  title: '',
  url: '',
  error: '',
}

const ListCell = ({
  item,
  loading,
  error,
  emptyHeaderTitle,
  emptyHeaderSubTitle,
  generalProps,
}: any) => {
  const [visible, setVisible] = useState<boolean>(false)

  const onTogglelist = () => {
    setVisible((v: boolean) => !v)
  }

  const totalIssues = item?.issuesInfo?.totalIssues

  return (
    <li
      key={item?._id}
      className={`border-4 rounded ${visible ? 'rounded-b-none' : ''}`}
    >
      <button
        className={`px-3 py-3 w-full text-left`}
        onClick={onTogglelist}
        aria-label={`Toggle section visible for ${item?.domain}`}
      >
        <div>
          <div className={'text-2xl md:text-2xl font-bold'}>{item?.domain}</div>
          <div>
            {totalIssues} possible issue
            {totalIssues === 1 ? '' : 's'}
          </div>
        </div>
      </button>
      {visible ? (
        <RenderInnerPages
          data={item}
          pageUrl={item.url}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
          generalProps={generalProps}
        />
      ) : null}
    </li>
  )
}

export function ListComponent({
  data,
  error,
  loading,
  removePress,
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  crawlWebsite,
  setModal,
  mutatationLoading,
  children,
}: any) {
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
      <ul className={listStyle}>
        {data?.map((item: any) => (
          <ListCell
            key={item?._id}
            item={item}
            pageUrl={item.url}
            loading={loading}
            error={error}
            emptyHeaderTitle={emptyHeaderTitle}
            emptyHeaderSubTitle={emptyHeaderSubTitle}
            generalProps={{
              handleClickOpen,
              handleClickOpenPlayer: setMiniPlayerContent,
              removePress,
              refetch,
              crawlWebsite,
              setModal,
              mutatationLoading: mutatationLoading,
            }}
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
