import React, { FC, useState, useEffect, useCallback, memo } from 'react'
import { useMiniPlayer } from '@app/data'
import { FullScreenModal } from '../fullscreen-modal'
import { InnerWrapper } from './list-wrapper'
import { useScriptsData } from '@app/data/external/scripts/scripts'
import { ScriptCell } from '../cells'

// return Scripts maped
function ScriptsWrapper(props: any) {
  const [visible, setVisible] = useState<boolean>(false)

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
        aria-label={`Toggle section visible for ${props?.pageUrl}`}
      >
        <div className={'text-2xl font-bold'}>{props?.pageUrl}</div>
      </button>
      <div
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b`}
      >
        <ScriptCell source={props} />
      </div>
    </li>
  )
}

// memo expensiveScripts
const Scripts = memo(ScriptsWrapper)

const RenderInner: FC<any> = (props) => {
  const { pageUrl, generalProps } = props
  const { data: issueSource, loading } = useScriptsData(pageUrl)

  return (
    <InnerWrapper
      {...props}
      data={issueSource?.length}
      loading={loading}
      generalProps={generalProps}
    >
      <ul>
        {issueSource?.map((page: any) => (
          <Scripts key={page._id} {...page} {...generalProps} />
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
        aria-expanded={visible}
        aria-label={`Toggle section visible for ${item?.domain}`}
      >
        <div>
          <div className={'text-2xl font-bold'}>{item?.domain}</div>
          <div>
            {totalIssues} possible issue
            {totalIssues === 1 ? '' : 's'}
          </div>
        </div>
      </button>
      {visible ? (
        <RenderInner
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
