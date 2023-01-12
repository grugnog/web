import { Analytic } from '@app/types'
import { fetcher } from '@app/utils/fetcher'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// todo: cache / use apollo
const getData = async (domain: string, page: number = 0) => {
  let eventDS = null

  try {
    eventDS = await fetcher(
      `/list/analytics?limit=50&domain=${domain}&page=${page}`,
      null,
      'GET'
    )
  } catch (e) {
    console.error(e)
  }

  return eventDS
}

// recrusive get data until complete
const getDataUntil = (
  {
    domain,
    setData,
  }: { domain: string; setData: Dispatch<SetStateAction<Analytic[]>> },
  page = 0
) => {
  queueMicrotask(async () => {
    const res = await getData(domain, page)
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
        await getDataUntil({ domain, setData }, nextPage)
      }
    }
  })
}

// get the entire analytics of a website all pages recursive. Todo: stream data or use gql
export const useFullAnalytics = ({
  liveData,
  domain,
}: {
  liveData?: Analytic[]
  domain: string
}) => {
  const [analyticsData, setData] = useState<Analytic[]>(liveData ?? [])
  const data = liveData?.length ? liveData : analyticsData

  useEffect(() => {
    getDataUntil({ domain, setData })
  }, [domain])

  return {
    data,
    setData,
  }
}
