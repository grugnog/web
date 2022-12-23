import { FC, memo, useMemo, useState } from 'react'
import { useIssueData } from '@app/data/external/issues/issue'
import { InnerWrapper } from '../../list-wrapper'
import { Button } from '../../../buttons'
import { Issues } from './list'
import type { Issue, PageIssue } from '@app/types'
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'

const RenderInnerIssuesWrapper: FC<any> = (props) => {
  const [issueIndex, setIndex] = useState<number>(0)

  const {
    data: issueSource,
    loading,
    onLoadMore,
  } = useIssueData(
    props?.pageUrl || props?.data?.url,
    props?.data?.subdomains || props?.data?.tld
  )

  const issueList = useMemo(() => {
    const items: PageIssue[] = []

    if (issueSource) {
      const base = (issueIndex + 1) * 10
      const low = base - 10

      for (let i = low; i < base; i++) {
        const item = issueSource[i]
        if (!item) {
          break
        }
        items.push(issueSource[i])
      }
    }

    return items
  }, [issueIndex, issueSource])

  const onPrevSelect = () => {
    if (issueIndex) {
      setIndex((x: number) => x - 1)
    }
  }

  const onLoadEvent = async () => {
    await onLoadMore()
    setIndex((x: number) => x + 1)
  }

  const blocked = issueSource?.length < (issueIndex + 1) * 10

  // todo: render special list cell with modal event for issue display or details view

  return (
    <>
      <div className='flex flex-col place-content-around'>
        <div className='h-96 md:h-[550px] overflow-y-auto bg-white'>
          <InnerWrapper {...props} data={issueSource?.length} loading={loading}>
            <ul>
              {issueList?.map((page: Issue) => (
                <Issues
                  key={page?._id}
                  {...page}
                  open={props.open}
                  small={props.small}
                  singleRow
                />
              ))}
            </ul>
          </InnerWrapper>
        </div>
        <div
          className={`${
            issueSource?.length > 1 ? '' : 'hidden'
          } text-right flex place-items-center place-content-end p-2 gap-x-2`}
        >
          <Button
            iconButton
            onClick={onPrevSelect}
            className={`text-gray-700 ${issueIndex ? 'visible' : 'hidden'}`}
          >
            <GrFormPreviousLink className='grIcon text-gray-700' />
          </Button>
          <Button
            iconButton
            disabled={loading}
            onClick={onLoadEvent}
            className={`text-gray-700 ${!blocked ? 'visible' : 'hidden'}`}
          >
            <GrFormNextLink className='grIcon text-gray-700' />
          </Button>
        </div>
      </div>
    </>
  )
}

export const RenderInnerIssuesPaging = memo(RenderInnerIssuesWrapper)
