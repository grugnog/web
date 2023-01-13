import { useLazyQuery } from '@apollo/react-hooks'
import { AppManager } from '@app/managers'
import { GET_PAGESPEED_STATS } from '@app/queries'

// lazy query page speed for a page
const usePageSpeed = (url: string, cb?: (data?: any) => void) => {
  const [getPageSpeed, { data, loading, refetch, error }] = useLazyQuery(
    GET_PAGESPEED_STATS,
    {
      variables: { url },
      onCompleted: (data) => {
        if (data && data.pagespeed && cb && typeof cb === 'function') {
          cb(data.pagespeed)
        } else {
          AppManager.toggleSnack(true, 'Pagespeed data not found!', 'error')
        }
      },
    }
  )

  return Object.freeze({
    data,
    loading,
    refetch,
    error,
    getPageSpeed,
  })
}

export { usePageSpeed }
