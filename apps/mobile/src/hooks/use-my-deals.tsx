import { useInfiniteQuery } from '@tanstack/react-query'
import { getMyDeals } from '../api/deals'

const LIMIT = 10

export function useMyDealsInfinite() {
  return useInfiniteQuery({
    queryKey: ['deals', 'my'],
    queryFn: ({ pageParam }) => getMyDeals({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + 1 : undefined,
  })
}