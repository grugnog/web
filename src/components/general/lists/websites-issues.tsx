import { FC, useState, useEffect, useCallback, memo, Fragment } from 'react'
import { useMiniPlayer } from '@app/data'
import { FullScreenModal } from '../fullscreen-modal'
import { FeedIssue } from '../feed/issue'
import { useIssueData } from '@app/data/external/issues/issue'
import { InnerWrapper } from './list-wrapper'
import { LoadMoreButton } from '../buttons'

// return issues maped
function IssuesWrapper(props: any) {
  const [visible, setVisible] = useState<boolean>(false)

  const onTogglelist = () => {
    setVisible((v: boolean) => !v)
  }

  const totalIssues = props?.issues?.length

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
        <div>
          <div className={'text-xl md:text-2xl font-bold truncate'}>
            {props?.pageUrl}
          </div>
          <div>
            {totalIssues} possible issue
            {totalIssues === 1 ? '' : 's'}
          </div>
        </div>
      </button>
      <ul
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b`}
      >
        {props?.issues?.map(
          ({ url, code, selector, ...domainProps }: any, index: number) => (
            <Fragment key={code + selector + index}>
              <FeedIssue {...domainProps} selector={selector} code={code} />
            </Fragment>
          )
        )}
      </ul>
    </li>
  )
}

// memo expensive issues
const Issues = memo(IssuesWrapper)

const RenderInnerIssuesWrapper: FC<any> = (props) => {
  const {
    data: issueSource,
    loading,
    onLoadMore,
  } = useIssueData(props.pageUrl, props?.data?.subdomains || props?.data?.tld)

  const { generalProps } = props

  return (
    <>
      <InnerWrapper
        {...props}
        data={issueSource?.length}
        loading={loading}
        generalProps={generalProps}
      >
        <ul>
          {issueSource?.map((page: any) => (
            <Issues key={`${page._id}`} {...page} {...generalProps} />
          ))}
        </ul>
      </InnerWrapper>
      <div className='pb-8'>
        <LoadMoreButton
          visible={issueSource?.length > 1}
          onLoadMoreEvent={onLoadMore}
        />
      </div>
    </>
  )
}

export const RenderInnerIssues = memo(RenderInnerIssuesWrapper)

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
          <div className={'text-2xl md:text-2xl font-bold'}>{item?.domain}</div>
          <div>
            {totalIssues} possible issue
            {totalIssues === 1 ? '' : 's'}
          </div>
        </div>
      </button>
      {visible ? (
        <RenderInnerIssues
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
