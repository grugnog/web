import { FC, memo } from 'react'
import { useIssueData } from '@app/data/external/issues/issue'
import { InnerWrapper } from '../../list-wrapper'
import { LoadMoreButton } from '../../../buttons'
import { Issues } from './list'
import type { Issue } from '@app/types'

const RenderInnerIssuesWrapper: FC<any> = (props) => {
  const {
    data: issueSource,
    loading,
    onLoadMore,
  } = useIssueData(
    props?.pageUrl || props?.data?.url,
    props?.data?.subdomains || props?.data?.tld
  )

  return (
    <>
      <InnerWrapper {...props} data={issueSource?.length} loading={loading}>
        <ul className='list-none'>
          {issueSource?.map((page: Issue) => (
            <Issues
              key={page._id}
              open={props.open}
              small={props.small}
              singleRow={props.singleRow}
              {...page}
            />
          ))}
        </ul>
      </InnerWrapper>
      <div
        className={
          props.singleRow
            ? `${issueSource?.length > 1 ? '' : 'hidden'}`
            : `pb-8 ${issueSource?.length > 1 ? '' : 'hidden'}`
        }
      >
        <LoadMoreButton
          visible={issueSource?.length > 1}
          onLoadMoreEvent={onLoadMore}
        />
      </div>
    </>
  )
}

export const RenderInnerIssues = memo(RenderInnerIssuesWrapper)
