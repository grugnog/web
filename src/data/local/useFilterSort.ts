import { filterSort } from '@app/lib'
import { useMemo } from 'react'
import { useSearchFilter } from './useSearchFilter'

// search and sorted filtered
export const useFilterSort = (data: { domain: string }[]) => {
  const { search } = useSearchFilter()
  const sortedData = useMemo(() => filterSort(data, search), [search, data])

  return {
    sortedData,
    search,
  }
}
