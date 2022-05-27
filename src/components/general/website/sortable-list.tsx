import { useQuery, useMutation } from '@apollo/react-hooks'
import { SORT_WEBSITES } from '@app/mutations'
import { GET_WEBSITES_LIST } from '@app/queries/websites'
import { FC, useEffect, useMemo, useState } from 'react'
import { SortableWebsites } from './sort'

export const SortableWebsiteList: FC<{ refetch: any }> = ({ refetch }) => {
  const { data, loading } = useQuery(GET_WEBSITES_LIST, {
    variables: { limit: 100 },
    fetchPolicy: 'network-only',
  })
  const [sortWebsites] = useMutation(SORT_WEBSITES)
  const [hasSorted, setSorted] = useState<boolean>()

  const list = useMemo(() => {
    return data?.user?.websites || []
  }, [data])

  const onSubmitSort = async (sortOrder: string[]) => {
    if (!hasSorted) {
      setSorted(true)
    }
    try {
      await sortWebsites({
        variables: { order: sortOrder.map((item: any) => item.content) },
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    return () => {
      if (hasSorted) {
        refetch()
      }
    }
  }, [hasSorted])

  return (
    <div>
      <h2 className='pb-3 text-xl'>
        Drag your websites in order to re-sort the position in the dashboard
        list.
      </h2>
      {list?.length ? (
        <SortableWebsites
          data={list?.map((item: any) => ({
            content: item.domain,
            id: `${item.domain}`,
          }))}
          onSubmitSort={onSubmitSort}
        />
      ) : (
        <div>{loading ? 'Loading Websites...' : 'An Issue occured.'}</div>
      )}
    </div>
  )
}
