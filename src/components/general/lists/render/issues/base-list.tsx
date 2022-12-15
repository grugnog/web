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
        <ul>
          {issueSource?.map((page: Issue) => (
            <Issues
              key={page._id}
              {...page}
              open={props.open}
              small={props.small}
            />
          ))}
        </ul>
      </InnerWrapper>
      <div className={`pb-8 ${issueSource?.length > 1 ? '' : 'hidden'}`}>
        <LoadMoreButton
          visible={issueSource?.length > 1}
          onLoadMoreEvent={onLoadMore}
        />
      </div>
    </>
  )
}

export const RenderInnerIssues = memo(RenderInnerIssuesWrapper)
