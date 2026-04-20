import { useInfiniteQuery } from '@tanstack/react-query'
import { getOffers, getMyOffers } from '../api/offers'

const LIMIT = 10

export function useOffersInfinite() {
  return useInfiniteQuery({
    queryKey: ['offers'],
    queryFn: ({ pageParam }) => getOffers({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + 1 : undefined,
  })
}

export function useMyOffersInfinite() {
  return useInfiniteQuery({
    queryKey: ['my-offers'],
    queryFn: ({ pageParam }) => getMyOffers({ page: pageParam, limit: LIMIT }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.length === LIMIT ? lastPageParam + 1 : undefined,
  })
}