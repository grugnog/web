import { FC, useState, memo } from 'react'
import { InnerWrapper } from './list-wrapper'
import { AnalyticsCell } from '../cells/website-cell-analytics'
import { useAnalyticsData } from '@app/data/external/analytics/analytics'
import { LoadMoreButton } from '../buttons'
import { listStyle } from '@app/styles/lists/tw'
import { ListCellHeader } from './render/issues/cell-header'

// return issues maped
function AnalyticsWrapper(props: any) {
  const [visible, setVisible] = useState<boolean>(false)

  const onTogglelist = () => {
    setVisible((v: boolean) => !v)
  }

  const { pageUrl, totalIssues, issues, small, singleRow } = props ?? {}

  return (
    <li>
      <ListCellHeader
        title={pageUrl}
        totalIssues={issues?.length || totalIssues || 0}
        setVisible={onTogglelist}
        visible={visible}
        small={small}
        singleRow={singleRow}
      />
      <div
        aria-hidden={!visible}
        className={`${visible ? 'visible' : 'hidden'} rounded-b`}
      >
        <AnalyticsCell {...props} />
      </div>
    </li>
  )
}

// memo expensive issues
const Analytics = memo(AnalyticsWrapper)

export const RenderInnerAnalytics: FC<any> = (props) => {
  const { pageUrl, generalProps, small, singleRow } = props
  const {
    data: analyticsSource,
    loading,
    onLoadMore,
  } = useAnalyticsData(pageUrl)

  return (
    <>
      <InnerWrapper
        {...props}
        data={analyticsSource?.length}
        loading={loading}
        generalProps={generalProps}
        avatar={false}
      >
        <ul>
          {analyticsSource?.map((page: any) => (
            <Analytics
              key={`${page._id}`}
              {...page}
              {...generalProps}
              small={small}
              singleRow={singleRow}
            />
          ))}
        </ul>
      </InnerWrapper>
      <div className={`pb-8 ${analyticsSource?.length > 1 ? '' : 'hidden'}`}>
        <LoadMoreButton
          visible={analyticsSource?.length > 1}
          onLoadMoreEvent={onLoadMore}
        />
      </div>
    </>
  )
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
        <RenderInnerAnalytics
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
  emptyHeaderTitle = 'Empty',
  emptyHeaderSubTitle = 'Add your website below',
  refetch,
  setModal,
  mutatationLoading,
  children,
}: any) {
  return (
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
            refetch,
            setModal,
            mutatationLoading: mutatationLoading,
          }}
        />
      ))}
      {children}
    </ul>
  )
}

export const List = memo(ListComponent)
