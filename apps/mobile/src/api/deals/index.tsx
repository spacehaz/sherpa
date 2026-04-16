import { Deal } from '@sherpa/shared'
import { apiClient } from '../client'
import { TGetMyDeals } from './types/get-deals'
import { TCreateDeal } from './types/create-deal'

export const getMyDeals: TGetMyDeals = async (params) => {
  const { data } = await apiClient.get<Deal[]>('/deals/my', { params })
  return data
}

export const createDeal: TCreateDeal = async (body) => {
  const { data } = await apiClient.post<Deal>('/deals', body)
  return data
}



