import { Deal, DealMessage } from '@sherpa/shared'
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

export const getDeal = async (id: string): Promise<Deal> => {
  const { data } = await apiClient.get<Deal>(`/deals/${id}`)
  return data
}

export const getDealMessages = async (dealId: string): Promise<DealMessage[]> => {
  const { data } = await apiClient.get<DealMessage[]>(`/deals/${dealId}/messages`, {
    params: { limit: 100, property: 'createdAt', direction: 'asc' },
  })
  return data
}

export const acceptMarkup = async (dealId: string, markupPercent: number): Promise<Deal> => {
  const { data } = await apiClient.patch<Deal>(`/deals/${dealId}/markup`, { markupPercent })
  return data
}

export const updateDealStatus = async (dealId: string, status: string): Promise<Deal> => {
  const { data } = await apiClient.patch<Deal>(`/deals/${dealId}/status`, { status })
  return data
}

export const sendDealMessage = async (
  dealId: string,
  message: string,
  proposedMarkupPercent?: number,
): Promise<DealMessage> => {
  const { data } = await apiClient.post<DealMessage>(`/deals/${dealId}/messages`, {
    message,
    ...(proposedMarkupPercent != null ? { proposedMarkupPercent } : {}),
  })
  return data
}



