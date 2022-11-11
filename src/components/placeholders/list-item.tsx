import { Fragment } from 'react'
import { Spacer } from '../general/spacer'
import { Skeleton } from './skeleton'

export function ListItemSkeleton({
  subTitle,
  smallCircle,
  avatar = true,
}: any) {
  const circleSize = smallCircle ? 20 : 40

  return (
    <li style={{ height: subTitle ? 72 : 49 }} className={'flex gap-x-2 px-2'}>
      {avatar ? (
        <div>
          <Skeleton
            style={{
              width: circleSize,
              height: circleSize,
            }}
          />
        </div>
      ) : null}

      <div className='flex-1'>
        <Skeleton style={{ height: 9.5, width: '30%' }} />

        {!subTitle ? (
          <div />
        ) : (
          <Fragment>
            <Skeleton style={{ marginTop: 6, height: 9, width: '20%' }} />
            {!avatar ? (
              <Skeleton style={{ marginTop: 6, height: 9, width: '20%' }} />
            ) : null}
          </Fragment>
        )}
      </div>
    </li>
  )
}

export function ListItemIssuesSkeleton({ subTitle }: any) {
  return (
    <li style={{ height: subTitle ? 109 : 72 }} className={'px-2'}>
      <Skeleton style={{ height: 20, width: '35%' }} />
      {!subTitle ? (
        <div />
      ) : (
        <Fragment>
          <Spacer height={3} />
          <Skeleton style={{ width: '75%', height: 26 }} />
          <Spacer height={4} />
          <Fragment>
            <Skeleton style={{ width: '100%', height: 29 }} />
          </Fragment>
        </Fragment>
      )}
    </li>
  )
}
