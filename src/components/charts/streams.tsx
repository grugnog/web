import { Analytic } from '@app/types'
import { fetcher } from '@app/utils/fetcher'
import { LegendProps } from '@nivo/legends'
import { ResponsiveStream } from '@nivo/stream'
import { useEffect, useState } from 'react'

const axisLeft = {
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: '',
  legendOffset: -35,
}

const legends: LegendProps[] = [
  {
    anchor: 'bottom-right',
    direction: 'column',
    translateX: 95,
    itemWidth: 80,
    itemHeight: 20,
    itemTextColor: '#999999',
    symbolSize: 12,
    symbolShape: 'circle',
    effects: [
      {
        on: 'hover',
        style: {
          itemTextColor: '#000000',
        },
      },
    ],
  },
]

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

export const WebsiteAnalyticStream = ({ domain }: { domain: string }) => {
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
    return <div className='bg-gray-200 h-[290px] md:h-[325px]]' />
  }

  return (
    <ResponsiveStream
      data={data}
      keys={['noticeCount', 'errorCount', 'warningCount']}
      margin={{ top: 40, right: 120, bottom: 40, left: 60 }}
      axisBottom={null}
      axisLeft={axisLeft}
      enableGridX={false}
      enableGridY={false}
      offsetType='silhouette'
      colors={{ scheme: 'nivo' }}
      borderColor={{ theme: 'background' }}
      label={getLabel}
      legends={legends}
    />
  )
}
