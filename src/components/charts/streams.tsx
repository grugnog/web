import { useEffect, useState, memo } from 'react'
import { Analytic } from '@app/types'
import { fetcher } from '@app/utils/fetcher'
// import { LegendProps } from '@nivo/legends'
import { ResponsiveStream, TooltipProps } from '@nivo/stream'

const theme = {
  axis: {
    ticks: {
      text: {
        fill: 'rgb(115,115,115)',
        fontSize: '0.75rem',
      },
    },
  },
}

const axisLeft = {
  orient: 'right',
  tickSize: 0,
  tickPadding: -20,
  tickRotation: 0,
  legend: '',
  legendOffset: -35,
}

const StackTip = ({ item }: { item: Analytic }) => {
  if (!item) {
    return null
  }

  return (
    <div className='rounded bg-white dark:bg-black border'>
      <div className='p-2 border-b'>
        <div className='text-sm'>{item.pageUrl}</div>
      </div>
      <div className='p-3 space-y-1'>
        <div className='text-gray-600 dark:text-gray-200 text-xs flex gap-x-2'>
          <div className='w-4 h-4 bg-[rgb(242,108,85)]'></div>
          {item.errorCount} Error{item.errorCount === 1 ? '' : 's'}
        </div>
        <div className='text-gray-600 dark:text-gray-200 text-xs flex gap-x-2'>
          <div className='w-4 h-4 bg-[rgb(236,223,113)]'></div>
          {item.warningCount} Warning{item.warningCount === 1 ? '' : 's'}
        </div>
      </div>
    </div>
  )
}

const Tip = ({ item }: { item: TooltipProps }) => {
  if (!item) {
    return null
  }

  console.log(item)

  return (
    <div className='rounded bg-white dark:bg-black border'>
      <div className='p-3 space-y-1'>
        {item.layer.label === 'error' ? (
          <div className='text-gray-600 dark:text-gray-200 text-xs flex gap-x-2'>
            <div className='w-4 h-4 bg-[rgb(242,108,85)]'></div>
            Errors
          </div>
        ) : (
          <div className='text-gray-600 dark:text-gray-200 text-xs flex gap-x-2'>
            <div className='w-4 h-4 bg-[rgb(236,223,113)]'></div>
            Warnings
          </div>
        )}
      </div>
    </div>
  )
}

// todo: cache / use apollo
const getData = async (domain: string, page: number = 0) => {
  let eventDS = null

  try {
    eventDS = await fetcher(
      `/list/analytics?limit=50&domain=${domain}&page${page}`,
      null,
      'GET'
    )
  } catch (e) {
    console.error(e)
  }

  return eventDS
}

const getLabel = (item: { id: string | number }) =>
  String(item.id).replace('Count', '')

const WebsiteAnalyticStreamComponent = ({ domain }: { domain: string }) => {
  const [data, setData] = useState<Analytic[]>([])

  useEffect(() => {
    const getDataUntil = (page = 0) => {
      queueMicrotask(async () => {
        const res = await getData(domain)
        const nextData: Analytic[] = res?.data

        if (nextData && nextData.length) {
          setData((x) => {
            if (x.length) {
              x.push(...nextData)
              return x
            }
            return nextData
          })
          const nextPage = page + 1
          const blocked = nextData?.length < nextPage * 10

          if (!blocked) {
            await getDataUntil(nextPage)
          }
        }
      })
    }

    getDataUntil()
  }, [domain])

  if (!data.length) {
    return (
      <div className='bg-gray-200 dark:bg-gray-800 h-[295px] md:h-[330px]' />
    )
  }

  // todo: tooltip darkmode

  return (
    <ResponsiveStream
      data={data}
      keys={['noticeCount', 'errorCount', 'warningCount']}
      margin={{ top: 20, right: 0, bottom: 20, left: 0 }}
      axisBottom={null}
      axisLeft={axisLeft}
      axisRight={null}
      enableGridX={false}
      enableGridY={false}
      offsetType='silhouette'
      colors={{ scheme: 'nivo' }}
      label={getLabel}
      theme={theme}
      layers={['dots', 'grid', 'layers', 'slices', 'legends', 'axes']}
      stackTooltip={(stack) =>
        data && <StackTip item={data[stack.slice.index]} />
      }
      tooltip={(stack) => data && <Tip item={stack} />}
      // legends={legends}
    />
  )
}

export const WebsiteAnalyticStream = memo(WebsiteAnalyticStreamComponent)
