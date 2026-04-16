import { useInfiniteQuery } from '@tanstack/react-query'
import { getRequests } from '../api/requests'

const LIMIT = 10

export function useRequestsInfinite() {
  return useInfiniteQuery({
    queryKey: ['requests'],
    queryFn: ({ pageParam }) => getRequests({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + 1 : undefined,
  })
}