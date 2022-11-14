import React, { FC, useState, useEffect, useCallback, memo } from 'react'
import { useMiniPlayer } from '@app/data'
import { FullScreenModal } from '../fullscreen-modal'
import { InnerWrapper } from './list-wrapper'
import { usePageActionsData } from '@app/data/external/page-actions/page-actions'
import { InputActions } from '../forms/input-actions'

const ActionCell = (props: any) => {
  const [editMode, _setEditable] = useState<boolean>()
  const [visible, setVisible] = useState<boolean>(false)

  if (editMode) {
    return <InputActions customActions customFields={[{ path: props.path }]} />
  }

  const onTogglelist = () => {
    setVisible((v: boolean) => !v)
  }

  return (
    <li>
      <button
        className={`border border-l-0 border-r-0 px-3 py-3 w-full text-left ${
          visible ? 'rounded-b-none' : ''
        }`}
        onClick={onTogglelist}
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${props?.path}`}
      >
        <div className={'text-xl md:text-2xl font-bold truncate'}>
          {props?.path}
        </div>
      </button>
      <ul
        aria-hidden={!visible}
        className={`${
          visible ? 'visible' : 'hidden'
        } rounded-b px-7 py-2 list-decimal`}
      >
        {props.events?.map((eventName: any, i: number) => (
          <li className='text-lg' key={`${i}-${eventName}`}>
            {eventName}
          </li>
        ))}
      </ul>
    </li>
  )
}

export const RenderInnerPageActions: FC<any> = (props) => {
  const { pageUrl, generalProps } = props
  const { data: pagesSource, loading } = usePageActionsData(pageUrl)

  const actionsExist = pagesSource?.length

  return (
    <InnerWrapper
      {...props}
      data={actionsExist}
      loading={loading}
      generalProps={generalProps}
      emptyHeaderTitle={'No page actions'}
      emptyHeaderSubTitle={'Create page actions on website monitor add.'}
    >
      <ul>
        {pagesSource?.map((page: any) => (
          <ActionCell {...page} key={page._id} />
        ))}
      </ul>
    </InnerWrapper>
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
    <div
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
        <RenderInnerPageActions
          data={item}
          pageUrl={item.url}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
          generalProps={generalProps}
        />
      ) : null}
    </div>
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
}: any) {
  const [modal, setOpen] = useState(defaultModalState)
  const { miniPlayer, setMiniPlayerContent } = useMiniPlayer()

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
    crawlWebsite,
    setModal,
    mutatationLoading: mutatationLoading,
  }

  return (
    <div className='space-y-2'>
      {data?.map((item: any) => (
        <ListCell
          key={item?._id}
          item={item}
          pageUrl={item.url}
          loading={loading}
          error={error}
          emptyHeaderTitle={emptyHeaderTitle}
          emptyHeaderSubTitle={emptyHeaderSubTitle}
          generalProps={generalProps}
        />
      ))}
      <FullScreenModal
        {...modal}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
        refetch={refetch}
        handleClickOpenPlayer={setMiniPlayerContent}
      />
    </div>
  )
}

export const List = memo(ListComponent)
