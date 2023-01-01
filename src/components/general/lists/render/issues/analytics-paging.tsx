import { FC, memo, useMemo, useState } from 'react'
import { useAnalyticsData } from '@app/data/external/analytics/analytics'
import { InnerWrapper } from '../../list-wrapper'
import { Button } from '../../../buttons'
import { AnalyticsList } from './analytics-list'
import type { Analytic } from '@app/types'
import { GrFormNextLink, GrFormPreviousLink } from 'react-icons/gr'

// paging issues for website dashboard cell
const RenderInnerAnalyticsWrapper: FC<any> = (props) => {
  const [issueIndex, setIndex] = useState<number>(0)

  const {
    data: issueSource,
    loading,
    onLoadMore,
  } = useAnalyticsData(
    props?.pageUrl || props?.data?.url,
    props?.data?.subdomains || props?.data?.tld
  )

  const issueList = useMemo(() => {
    const items: Analytic[] = []

    if (issueSource) {
      const base = (issueIndex + 1) * 10

      for (let i = base - 10; i < base; i++) {
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

  return (
    <>
      <div className='flex flex-col place-content-around'>
        <div className='h-[450px]'>
          <InnerWrapper {...props} data={issueSource?.length} loading={loading}>
            <ul className='list-none'>
              {issueList?.map((page) => (
                <AnalyticsList key={page?._id} open={props.open} {...page} />
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
            className={` ${issueIndex ? 'visible' : 'hidden'}`}
          >
            <GrFormPreviousLink className='grIcon' />
          </Button>
          <Button
            iconButton
            disabled={loading}
            onClick={onLoadEvent}
            className={` ${!blocked ? 'visible' : 'hidden'}`}
          >
            <GrFormNextLink className='grIcon' />
          </Button>
        </div>
      </div>
    </>
  )
}

export const RenderInnerAnalyticsPaging = memo(RenderInnerAnalyticsWrapper)
